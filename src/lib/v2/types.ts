import type { ExamRecord } from "@/lib/tracker-data";

export type SubscriptionTier = "free" | "pro";

export type SubscriptionStatus =
  | "none"
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

export type UserRow = {
  id: string;
  email: string;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type ExamRecordRow = {
  id: string;
  user_id: string;
  subject_id: string;
  date: string;
  mcq_score: number;
  frq_score: number;
  total_percent: number;
  ap_score: 1 | 2 | 3 | 4 | 5;
  topic_scores_json: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TargetScoreRow = {
  user_id: string;
  subject_id: string;
  target_score: 1 | 2 | 3 | 4 | 5;
  updated_at: string;
};

export type CreateRecordInput = {
  subjectId: string;
  date?: string;
  mcqScore: number;
  frqScore: number;
  topicScores?: Record<string, number>;
  notes?: string;
};

export type ApiExamRecord = ExamRecord;

export type UsageSummary = {
  subjectsUsed: number;
  recordsTotal: number;
  recordsBySubject: Record<string, number>;
};

export type PlanLimits = {
  subjects: number | null;
  recordsPerSubject: number | null;
  csvExport: boolean;
  advancedReport: boolean;
};
