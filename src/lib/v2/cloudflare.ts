import { getCloudflareContext } from "@opennextjs/cloudflare";

import { ApiError } from "@/lib/v2/api";

type D1Result<T = unknown> = {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: unknown;
};

export type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
};

export type D1Database = {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
};

export type AppCloudflareEnv = {
  DB?: D1Database;
  RATE_LIMIT_KV?: unknown;
};

export function getAppEnv() {
  return getCloudflareContext().env as AppCloudflareEnv;
}

export function getDb() {
  const db = getAppEnv().DB;

  if (!db) {
    throw new ApiError(
      500,
      "CONFIGURATION_ERROR",
      "Cloudflare D1 binding DB is not configured."
    );
  }

  return db;
}
