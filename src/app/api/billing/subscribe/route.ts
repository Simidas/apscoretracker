import type { NextRequest } from "next/server";

import {
  ApiError,
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
    if (process.env.BILLING_ENABLED !== "true") {
      throw new ApiError(
        503,
        "FEATURE_DISABLED",
        "Pro billing is not available yet."
      );
    }

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
