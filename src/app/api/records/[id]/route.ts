import type { NextRequest } from "next/server";

import { apiErrorResponse, jsonResponse } from "@/lib/v2/api";
import { requireUserId } from "@/lib/v2/auth";
import { deleteRecord } from "@/lib/v2/records";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await requireUserId();
    const { id } = await params;

    await deleteRecord(userId, id);

    return jsonResponse({ ok: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
