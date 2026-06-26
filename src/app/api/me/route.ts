import { apiErrorResponse, jsonResponse } from "@/lib/v2/api";
import { getOrCreateCurrentUser } from "@/lib/v2/auth";
import { getPlanLimits, getTierFromStatus } from "@/lib/v2/limits";
import { getUsageSummary } from "@/lib/v2/records";

export async function GET() {
  try {
    const user = await getOrCreateCurrentUser();
    const tier = getTierFromStatus(
      user.subscription_tier,
      user.subscription_status
    );
    const usage = await getUsageSummary(user.id);

    return jsonResponse({
      user: {
        id: user.id,
        email: user.email,
      },
      subscription: {
        tier,
        status: user.subscription_status,
        currentPeriodEnd: user.current_period_end,
      },
      usage,
      limits: getPlanLimits(tier),
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
