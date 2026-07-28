import type { ExamRecord } from "@/lib/tracker-data";
import type { PlanLimits, UsageSummary } from "@/lib/v2/types";

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
  };
};

export class ClientApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export type AccountSummary = {
  subscription: {
    tier: "free" | "pro";
    status: string;
    currentPeriodEnd: string | null;
  };
  usage: UsageSummary;
  limits: PlanLimits;
};

export async function fetchAccountSummary() {
  return apiRequest<AccountSummary>("/api/me");
}

export async function fetchRecords() {
  const response = await apiRequest<{ records: ExamRecord[] }>("/api/records");
  return response.records;
}

export async function createRecord(
  record: Pick<
    ExamRecord,
    "subjectId" | "date" | "mcqScore" | "frqScore" | "topicScores" | "notes"
  >
) {
  const response = await apiRequest<{ record: ExamRecord }>("/api/records", {
    method: "POST",
    body: JSON.stringify(record),
  });

  return response.record;
}

export async function removeRecord(recordId: string) {
  await apiRequest<{ ok: true }>(`/api/records/${recordId}`, {
    method: "DELETE",
  });
}

export async function fetchTargetScores() {
  const response = await apiRequest<{
    targets: Record<string, 1 | 2 | 3 | 4 | 5>;
  }>("/api/targets");

  return response.targets;
}

export async function updateTargetScore(
  subjectId: string,
  targetScore: 1 | 2 | 3 | 4 | 5
) {
  await apiRequest<{ ok: true }>("/api/targets", {
    method: "PUT",
    body: JSON.stringify({ subjectId, targetScore }),
  });
}

async function apiRequest<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    cache: "no-store",
    credentials: "same-origin",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const payload = (await response.json().catch(() => ({}))) as
    | T
    | ApiErrorPayload;

  if (!response.ok) {
    const error = (payload as ApiErrorPayload).error;

    throw new ClientApiError(
      response.status,
      error?.code ?? "SERVER_ERROR",
      error?.message ?? "Something went wrong. Please try again."
    );
  }

  return payload as T;
}
