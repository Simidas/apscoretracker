import { clerkClient } from "@clerk/nextjs/server";

import { apiErrorResponse, jsonResponse } from "@/lib/v2/api";
import { requireUserId } from "@/lib/v2/auth";
import { getStripe } from "@/lib/v2/billing";
import { getDb } from "@/lib/v2/cloudflare";

export async function DELETE() {
  try {
    const userId = await requireUserId();
    const db = getDb();
    const user = await db
      .prepare("SELECT stripe_customer_id FROM users WHERE id = ?")
      .bind(userId)
      .first<{ stripe_customer_id: string | null }>();

    if (user?.stripe_customer_id) {
      await getStripe().customers.del(user.stripe_customer_id);
    }

    await db.batch([
      db.prepare("DELETE FROM exam_records WHERE user_id = ?").bind(userId),
      db.prepare("DELETE FROM target_scores WHERE user_id = ?").bind(userId),
      db.prepare("DELETE FROM users WHERE id = ?").bind(userId),
    ]);

    const clerk = await clerkClient();
    await clerk.users.deleteUser(userId);

    return jsonResponse({ ok: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
