import type { NextRequest } from "next/server";

import {
  apiErrorResponse,
  assertNumber,
  assertString,
  jsonResponse,
} from "@/lib/v2/api";
import { getOrCreateCurrentUser, requireUserId } from "@/lib/v2/auth";
import { createRecord, listRecords } from "@/lib/v2/records";

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId();
    const subjectId = request.nextUrl.searchParams.get("subjectId") ?? undefined;
    const records = await listRecords(userId, subjectId);

    return jsonResponse({ records });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getOrCreateCurrentUser();
    const payload = await request.json();
    const subjectId = assertString(payload.subjectId, "subjectId");
    const mcqScore = assertNumber(payload.mcqScore, "mcqScore");
    const frqScore = assertNumber(payload.frqScore, "frqScore");
    const record = await createRecord(user, {
      subjectId,
      date: typeof payload.date === "string" ? payload.date : undefined,
      mcqScore,
      frqScore,
      topicScores:
        payload.topicScores && typeof payload.topicScores === "object"
          ? payload.topicScores
          : undefined,
      notes: typeof payload.notes === "string" ? payload.notes : undefined,
    });

    return jsonResponse({ record }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
