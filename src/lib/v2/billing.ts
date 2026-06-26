import Stripe from "stripe";

import { ApiError } from "@/lib/v2/api";
import { getDb } from "@/lib/v2/cloudflare";
import type { SubscriptionStatus, SubscriptionTier, UserRow } from "@/lib/v2/types";

type BillingPlan = "monthly" | "yearly";

let stripeClient: Stripe | null = null;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new ApiError(
      500,
      "CONFIGURATION_ERROR",
      "STRIPE_SECRET_KEY is not configured."
    );
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });
  }

  return stripeClient;
}

export function getPriceId(plan: BillingPlan) {
  const priceId =
    plan === "yearly"
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID
      : process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID;

  if (!priceId) {
    throw new ApiError(
      500,
      "CONFIGURATION_ERROR",
      `Stripe ${plan} price id is not configured.`
    );
  }

  return priceId;
}

export function parseBillingPlan(value: unknown): BillingPlan {
  if (value === "monthly" || value === "yearly") {
    return value;
  }

  throw new ApiError(400, "INVALID_INPUT", "plan must be monthly or yearly.");
}

export async function createSubscriptionClientSecret(
  user: UserRow,
  plan: BillingPlan
) {
  const stripe = getStripe();
  const customerId = await getOrCreateStripeCustomer(user);
  const priceId = getPriceId(plan);

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
    },
    expand: ["latest_invoice.confirmation_secret", "latest_invoice.payment_intent"],
  });

  const clientSecret = getSubscriptionClientSecret(subscription);

  if (!clientSecret) {
    throw new ApiError(
      500,
      "SERVER_ERROR",
      "Stripe did not return a payment client secret."
    );
  }

  await syncSubscriptionFields(user.id, {
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    subscription_status: mapSubscriptionStatus(subscription.status),
    subscription_tier: tierFromStripeStatus(subscription.status),
    current_period_end: getSubscriptionPeriodEnd(subscription),
  });

  return clientSecret;
}

export async function createCheckoutSession(user: UserRow, plan: BillingPlan) {
  const stripe = getStripe();
  const customerId = await getOrCreateStripeCustomer(user);
  const priceId = getPriceId(plan);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/account?upgraded=1`,
    cancel_url: `${appUrl}/tracker?upgrade=cancelled`,
  });

  if (!session.url) {
    throw new ApiError(500, "SERVER_ERROR", "Stripe did not return a URL.");
  }

  return session.url;
}

export async function createCustomerPortalUrl(user: UserRow) {
  const stripe = getStripe();
  const customerId = await getOrCreateStripeCustomer(user);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}/account`,
  });

  return session.url;
}

export async function constructStripeWebhookEvent(
  payload: string,
  signature: string | null
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new ApiError(
      500,
      "CONFIGURATION_ERROR",
      "STRIPE_WEBHOOK_SECRET is not configured."
    );
  }

  if (!signature) {
    throw new ApiError(400, "INVALID_INPUT", "Missing stripe-signature.");
  }

  return getStripe().webhooks.constructEventAsync(
    payload,
    signature,
    webhookSecret,
    undefined,
    Stripe.createSubtleCryptoProvider()
  );
}

export async function handleStripeWebhook(event: Stripe.Event) {
  const alreadyProcessed = await hasProcessedStripeEvent(event.id);

  if (alreadyProcessed) {
    return;
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    await syncStripeSubscription(event.data.object as Stripe.Subscription);
  }

  if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = getInvoiceSubscriptionId(invoice);

    if (subscriptionId) {
      const subscription = await getStripe().subscriptions.retrieve(
        subscriptionId
      );
      await syncStripeSubscription(subscription);
    }
  }

  await markStripeEventProcessed(event.id, event.type);
}

async function getOrCreateStripeCustomer(user: UserRow) {
  if (user.stripe_customer_id) {
    return user.stripe_customer_id;
  }

  const customer = await getStripe().customers.create({
    email: user.email,
    metadata: {
      clerkUserId: user.id,
    },
  });

  await getDb()
    .prepare(
      `
      UPDATE users
      SET stripe_customer_id = ?, updated_at = ?
      WHERE id = ?
      `
    )
    .bind(customer.id, new Date().toISOString(), user.id)
    .run();

  return customer.id;
}

async function syncStripeSubscription(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  const item = subscription.items.data[0];

  await getDb()
    .prepare(
      `
      UPDATE users
      SET
        subscription_tier = ?,
        subscription_status = ?,
        stripe_subscription_id = ?,
        stripe_price_id = ?,
        current_period_end = ?,
        updated_at = ?
      WHERE stripe_customer_id = ?
      `
    )
    .bind(
      tierFromStripeStatus(subscription.status),
      mapSubscriptionStatus(subscription.status),
      subscription.id,
      item?.price.id ?? null,
      getSubscriptionPeriodEnd(subscription),
      new Date().toISOString(),
      customerId
    )
    .run();
}

async function syncSubscriptionFields(
  userId: string,
  fields: {
    subscription_tier: SubscriptionTier;
    subscription_status: SubscriptionStatus;
    stripe_subscription_id: string;
    stripe_price_id: string;
    current_period_end: string | null;
  }
) {
  await getDb()
    .prepare(
      `
      UPDATE users
      SET
        subscription_tier = ?,
        subscription_status = ?,
        stripe_subscription_id = ?,
        stripe_price_id = ?,
        current_period_end = ?,
        updated_at = ?
      WHERE id = ?
      `
    )
    .bind(
      fields.subscription_tier,
      fields.subscription_status,
      fields.stripe_subscription_id,
      fields.stripe_price_id,
      fields.current_period_end,
      new Date().toISOString(),
      userId
    )
    .run();
}

async function hasProcessedStripeEvent(eventId: string) {
  const row = await getDb()
    .prepare("SELECT id FROM stripe_events WHERE id = ?")
    .bind(eventId)
    .first<{ id: string }>();

  return Boolean(row);
}

async function markStripeEventProcessed(eventId: string, type: string) {
  await getDb()
    .prepare("INSERT OR IGNORE INTO stripe_events (id, type) VALUES (?, ?)")
    .bind(eventId, type)
    .run();
}

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
  const invoiceWithSubscription = invoice as Stripe.Invoice & {
    subscription?: string | Stripe.Subscription | null;
  };
  const subscription = invoiceWithSubscription.subscription;

  if (!subscription) {
    return null;
  }

  return typeof subscription === "string" ? subscription : subscription.id;
}

function getSubscriptionClientSecret(subscription: Stripe.Subscription) {
  const latestInvoice = subscription.latest_invoice;

  if (!latestInvoice || typeof latestInvoice === "string") {
    return null;
  }

  const invoiceWithSecrets = latestInvoice as Stripe.Invoice & {
    confirmation_secret?: { client_secret?: string | null } | null;
    payment_intent?: string | Stripe.PaymentIntent | null;
  };

  if (invoiceWithSecrets.confirmation_secret?.client_secret) {
    return invoiceWithSecrets.confirmation_secret.client_secret;
  }

  const paymentIntent = invoiceWithSecrets.payment_intent;

  if (paymentIntent && typeof paymentIntent !== "string") {
    return paymentIntent.client_secret;
  }

  return null;
}

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const subscriptionWithPeriod = subscription as Stripe.Subscription & {
    current_period_end?: number;
  };

  return subscriptionWithPeriod.current_period_end
    ? new Date(subscriptionWithPeriod.current_period_end * 1000).toISOString()
    : null;
}

function mapSubscriptionStatus(status: Stripe.Subscription.Status) {
  return status as SubscriptionStatus;
}

function tierFromStripeStatus(status: Stripe.Subscription.Status): SubscriptionTier {
  return ["active", "trialing", "past_due"].includes(status) ? "pro" : "free";
}
