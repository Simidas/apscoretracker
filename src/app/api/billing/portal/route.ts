import { ApiError, apiErrorResponse, jsonResponse } from "@/lib/v2/api";
import { getOrCreateCurrentUser } from "@/lib/v2/auth";
import { createCustomerPortalUrl } from "@/lib/v2/billing";

export async function POST() {
  try {
    if (process.env.BILLING_ENABLED !== "true") {
      throw new ApiError(
        503,
        "FEATURE_DISABLED",
        "Subscription management is not available yet."
      );
    }

    const user = await getOrCreateCurrentUser();
    const url = await createCustomerPortalUrl(user);

    return jsonResponse({ url });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
