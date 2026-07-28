import type { NextRequest } from "next/server";

import {
  apiErrorResponse,
  jsonResponse,
  readJsonObject,
} from "@/lib/v2/api";
import { getOrCreateCurrentUser } from "@/lib/v2/auth";
import {
  createCheckoutSession,
  createSubscriptionClientSecret,
  parseBillingPlan,
} from "@/lib/v2/billing";

export async function POST(request: NextRequest) {
  try {
    const user = await getOrCreateCurrentUser();
    const payload = await readJsonObject(request);
    const plan = parseBillingPlan(payload.plan);

    if (process.env.STRIPE_BILLING_MODE === "checkout") {
      const url = await createCheckoutSession(user, plan);

      return jsonResponse({ mode: "checkout", url });
    }

    const clientSecret = await createSubscriptionClientSecret(user, plan);

    return jsonResponse({ mode: "elements", clientSecret });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
