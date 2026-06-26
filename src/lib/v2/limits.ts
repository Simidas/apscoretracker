import type { PlanLimits, SubscriptionTier, UsageSummary } from "@/lib/v2/types";

export const FREE_RECORDS_PER_SUBJECT = 10;
export const FREE_SUBJECT_LIMIT = 5;

export function getPlanLimits(tier: SubscriptionTier): PlanLimits {
  if (tier === "pro") {
    return {
      subjects: null,
      recordsPerSubject: null,
      csvExport: true,
      advancedReport: true,
    };
  }

  return {
    subjects: FREE_SUBJECT_LIMIT,
    recordsPerSubject: FREE_RECORDS_PER_SUBJECT,
    csvExport: false,
    advancedReport: false,
  };
}

export function getTierFromStatus(
  tier: SubscriptionTier,
  status: string | null | undefined
): SubscriptionTier {
  if (
    tier === "pro" &&
    ["active", "trialing", "past_due"].includes(status ?? "")
  ) {
    return "pro";
  }

  return "free";
}

export function canCreateRecord(
  tier: SubscriptionTier,
  usage: UsageSummary,
  subjectId: string
) {
  const limits = getPlanLimits(tier);

  if (limits.recordsPerSubject === null) {
    return true;
  }

  const subjectRecordCount = usage.recordsBySubject[subjectId] ?? 0;

  return subjectRecordCount < limits.recordsPerSubject;
}
