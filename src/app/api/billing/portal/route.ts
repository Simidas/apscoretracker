import { apiErrorResponse, jsonResponse } from "@/lib/v2/api";
import { getOrCreateCurrentUser } from "@/lib/v2/auth";
import { createCustomerPortalUrl } from "@/lib/v2/billing";

export async function POST() {
  try {
    const user = await getOrCreateCurrentUser();
    const url = await createCustomerPortalUrl(user);

    return jsonResponse({ url });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
