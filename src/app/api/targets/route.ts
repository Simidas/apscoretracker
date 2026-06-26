import type { NextRequest } from "next/server";

import {
  apiErrorResponse,
  assertString,
  assertTargetScore,
  jsonResponse,
} from "@/lib/v2/api";
import { requireUserId } from "@/lib/v2/auth";
import { listTargetScores, upsertTargetScore } from "@/lib/v2/records";

export async function GET() {
  try {
    const userId = await requireUserId();
    const targets = await listTargetScores(userId);

    return jsonResponse({ targets });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await requireUserId();
    const payload = await request.json();
    const subjectId = assertString(payload.subjectId, "subjectId");
    const targetScore = assertTargetScore(payload.targetScore);

    await upsertTargetScore(userId, subjectId, targetScore);

    return jsonResponse({ ok: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
