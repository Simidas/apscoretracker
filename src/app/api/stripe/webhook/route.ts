import type { NextRequest } from "next/server";

import { apiErrorResponse, jsonResponse } from "@/lib/v2/api";
import {
  constructStripeWebhookEvent,
  handleStripeWebhook,
} from "@/lib/v2/billing";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");
    const event = await constructStripeWebhookEvent(payload, signature);

    await handleStripeWebhook(event);

    return jsonResponse({ received: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
