import type { NextRequest } from "next/server";

import { ApiError, apiErrorResponse, jsonResponse } from "@/lib/v2/api";
import {
  constructStripeWebhookEvent,
  handleStripeWebhook,
} from "@/lib/v2/billing";

export async function POST(request: NextRequest) {
  try {
    if (process.env.BILLING_ENABLED !== "true") {
      throw new ApiError(
        503,
        "FEATURE_DISABLED",
        "Stripe billing is not enabled."
      );
    }

    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");
    const event = await constructStripeWebhookEvent(payload, signature);

    await handleStripeWebhook(event);

    return jsonResponse({ received: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
