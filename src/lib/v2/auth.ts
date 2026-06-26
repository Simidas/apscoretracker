import { auth, currentUser } from "@clerk/nextjs/server";

import { ApiError } from "@/lib/v2/api";
import { getDb } from "@/lib/v2/cloudflare";
import type { UserRow } from "@/lib/v2/types";

export async function requireUserId() {
  const { userId } = await auth();

  if (!userId) {
    throw new ApiError(401, "UNAUTHENTICATED", "Please sign in to continue.");
  }

  return userId;
}

export async function getOrCreateCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new ApiError(401, "UNAUTHENTICATED", "Please sign in to continue.");
  }

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new ApiError(
      400,
      "INVALID_INPUT",
      "Your account needs an email address before you can save data."
    );
  }

  return upsertUser(clerkUser.id, email);
}

export async function upsertUser(userId: string, email: string) {
  const db = getDb();
  const now = new Date().toISOString();

  await db
    .prepare(
      `
      INSERT INTO users (id, email, created_at, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        email = excluded.email,
        updated_at = excluded.updated_at
      `
    )
    .bind(userId, email, now, now)
    .run();

  const user = await db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(userId)
    .first<UserRow>();

  if (!user) {
    throw new ApiError(500, "SERVER_ERROR", "Unable to load user profile.");
  }

  return user;
}

export async function getCurrentUserRow() {
  const userId = await requireUserId();
  const db = getDb();

  return db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(userId)
    .first<UserRow>();
}
