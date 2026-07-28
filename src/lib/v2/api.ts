import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "UNAUTHENTICATED"
  | "INVALID_INPUT"
  | "LIMIT_REACHED"
  | "NOT_FOUND"
  | "CONFIGURATION_ERROR"
  | "SERVER_ERROR";

export class ApiError extends Error {
  status: number;
  code: ApiErrorCode;

  constructor(status: number, code: ApiErrorCode, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function jsonResponse<T>(payload: T, init?: ResponseInit) {
  return NextResponse.json(payload, init);
}

export function apiErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.status }
    );
  }

  console.error(error);

  return NextResponse.json(
    {
      error: {
        code: "SERVER_ERROR",
        message: "Something went wrong. Please try again.",
      },
    },
    { status: 500 }
  );
}

export async function readJsonObject(request: Request) {
  const payload: unknown = await request.json();

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ApiError(400, "INVALID_INPUT", "Request body must be an object.");
  }

  return payload as Record<string, unknown>;
}

export function assertString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ApiError(400, "INVALID_INPUT", `${field} is required.`);
  }

  return value.trim();
}

export function assertNumber(value: unknown, field: string) {
  const numberValue = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numberValue)) {
    throw new ApiError(400, "INVALID_INPUT", `${field} must be a number.`);
  }

  return numberValue;
}

export function optionalNumberRecord(value: unknown, field: string) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (
    typeof value !== "object" ||
    Array.isArray(value) ||
    !Object.values(value).every(
      (item) => typeof item === "number" && Number.isFinite(item)
    )
  ) {
    throw new ApiError(
      400,
      "INVALID_INPUT",
      `${field} must contain numeric values.`
    );
  }

  return value as Record<string, number>;
}

export function assertTargetScore(value: unknown) {
  const score = assertNumber(value, "targetScore");

  if (![1, 2, 3, 4, 5].includes(score)) {
    throw new ApiError(400, "INVALID_INPUT", "targetScore must be 1-5.");
  }

  return score as 1 | 2 | 3 | 4 | 5;
}
