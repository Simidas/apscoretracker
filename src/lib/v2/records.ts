import {
  calculateApScore,
  calculateTotalPercent,
  getSubject,
  subjects,
} from "@/lib/tracker-data";
import { ApiError } from "@/lib/v2/api";
import { getDb } from "@/lib/v2/cloudflare";
import { canCreateRecord, getTierFromStatus } from "@/lib/v2/limits";
import type {
  ApiExamRecord,
  CreateRecordInput,
  ExamRecordRow,
  TargetScoreRow,
  UsageSummary,
  UserRow,
} from "@/lib/v2/types";

export function mapRecordRow(row: ExamRecordRow): ApiExamRecord {
  let topicScores: Record<string, number> = {};

  try {
    topicScores = JSON.parse(row.topic_scores_json);
  } catch {
    topicScores = {};
  }

  return {
    id: row.id,
    subjectId: row.subject_id,
    date: row.date,
    mcqScore: row.mcq_score,
    frqScore: row.frq_score,
    totalPercent: row.total_percent,
    apScore: row.ap_score,
    topicScores,
    notes: row.notes ?? undefined,
  };
}

export async function getUsageSummary(userId: string): Promise<UsageSummary> {
  const db = getDb();
  const rows = await db
    .prepare(
      `
      SELECT subject_id as subjectId, COUNT(*) as count
      FROM exam_records
      WHERE user_id = ? AND deleted_at IS NULL
      GROUP BY subject_id
      `
    )
    .bind(userId)
    .all<{ subjectId: string; count: number }>();

  const recordsBySubject: Record<string, number> = {};
  let recordsTotal = 0;

  for (const row of rows.results ?? []) {
    recordsBySubject[row.subjectId] = row.count;
    recordsTotal += row.count;
  }

  return {
    subjectsUsed: Object.keys(recordsBySubject).length,
    recordsTotal,
    recordsBySubject,
  };
}

export async function listRecords(userId: string, subjectId?: string) {
  const db = getDb();

  if (subjectId) {
    validateSubjectId(subjectId);

    const rows = await db
      .prepare(
        `
        SELECT * FROM exam_records
        WHERE user_id = ? AND subject_id = ? AND deleted_at IS NULL
        ORDER BY date DESC, created_at DESC
        `
      )
      .bind(userId, subjectId)
      .all<ExamRecordRow>();

    return (rows.results ?? []).map(mapRecordRow);
  }

  const rows = await db
    .prepare(
      `
      SELECT * FROM exam_records
      WHERE user_id = ? AND deleted_at IS NULL
      ORDER BY date DESC, created_at DESC
      `
    )
    .bind(userId)
    .all<ExamRecordRow>();

  return (rows.results ?? []).map(mapRecordRow);
}

export async function createRecord(user: UserRow, input: CreateRecordInput) {
  const subject = getSubject(input.subjectId);

  if (subject.id !== input.subjectId) {
    throw new ApiError(400, "INVALID_INPUT", "Unknown AP subject.");
  }

  validateRawScore(input.mcqScore, 0, subject.mcqMax, "mcqScore");
  validateRawScore(input.frqScore, 0, subject.frqMax, "frqScore");

  const topicScores = validateTopicScores(input.subjectId, input.topicScores);
  const usage = await getUsageSummary(user.id);
  const effectiveTier = getTierFromStatus(
    user.subscription_tier,
    user.subscription_status
  );

  if (!canCreateRecord(effectiveTier, usage, input.subjectId)) {
    throw new ApiError(
      403,
      "LIMIT_REACHED",
      "Free accounts can save up to 10 practice tests per subject."
    );
  }

  const totalPercent = calculateTotalPercent(
    subject,
    input.mcqScore,
    input.frqScore
  );
  const apScore = calculateApScore(subject, totalPercent);
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const date = input.date ?? now;
  const notes = input.notes?.trim() || null;

  await getDb()
    .prepare(
      `
      INSERT INTO exam_records (
        id,
        user_id,
        subject_id,
        date,
        mcq_score,
        frq_score,
        total_percent,
        ap_score,
        topic_scores_json,
        notes,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    )
    .bind(
      id,
      user.id,
      input.subjectId,
      date,
      input.mcqScore,
      input.frqScore,
      totalPercent,
      apScore,
      JSON.stringify(topicScores),
      notes,
      now,
      now
    )
    .run();

  return {
    id,
    subjectId: input.subjectId,
    date,
    mcqScore: input.mcqScore,
    frqScore: input.frqScore,
    totalPercent,
    apScore,
    topicScores,
    notes: notes ?? undefined,
  } satisfies ApiExamRecord;
}

export async function deleteRecord(userId: string, recordId: string) {
  const now = new Date().toISOString();
  const result = await getDb()
    .prepare(
      `
      UPDATE exam_records
      SET deleted_at = ?, updated_at = ?
      WHERE id = ? AND user_id = ? AND deleted_at IS NULL
      `
    )
    .bind(now, now, recordId, userId)
    .run();

  if (result.success === false) {
    throw new ApiError(500, "SERVER_ERROR", "Unable to delete record.");
  }
}

export async function listTargetScores(userId: string) {
  const rows = await getDb()
    .prepare("SELECT * FROM target_scores WHERE user_id = ?")
    .bind(userId)
    .all<TargetScoreRow>();

  const targets: Record<string, 1 | 2 | 3 | 4 | 5> = {};

  for (const row of rows.results ?? []) {
    targets[row.subject_id] = row.target_score;
  }

  return targets;
}

export async function upsertTargetScore(
  userId: string,
  subjectId: string,
  targetScore: 1 | 2 | 3 | 4 | 5
) {
  validateSubjectId(subjectId);

  const now = new Date().toISOString();

  await getDb()
    .prepare(
      `
      INSERT INTO target_scores (user_id, subject_id, target_score, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id, subject_id) DO UPDATE SET
        target_score = excluded.target_score,
        updated_at = excluded.updated_at
      `
    )
    .bind(userId, subjectId, targetScore, now)
    .run();
}

function validateSubjectId(subjectId: string) {
  if (!subjects.some((subject) => subject.id === subjectId)) {
    throw new ApiError(400, "INVALID_INPUT", "Unknown AP subject.");
  }
}

function validateRawScore(value: number, min: number, max: number, field: string) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new ApiError(
      400,
      "INVALID_INPUT",
      `${field} must be between ${min} and ${max}.`
    );
  }
}

function validateTopicScores(
  subjectId: string,
  topicScores: Record<string, number> | undefined
) {
  if (!topicScores) {
    return {};
  }

  const subject = getSubject(subjectId);
  const allowedTopicIds = new Set(subject.topics.map((topic) => topic.id));
  const sanitized: Record<string, number> = {};

  for (const [topicId, score] of Object.entries(topicScores)) {
    if (!allowedTopicIds.has(topicId)) {
      throw new ApiError(400, "INVALID_INPUT", `Unknown topic: ${topicId}.`);
    }

    if (!Number.isFinite(score) || score < 0 || score > 100) {
      throw new ApiError(
        400,
        "INVALID_INPUT",
        `Topic score for ${topicId} must be between 0 and 100.`
      );
    }

    sanitized[topicId] = Math.round(score);
  }

  return sanitized;
}
