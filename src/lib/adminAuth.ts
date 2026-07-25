import { createHmac, timingSafeEqual } from "node:crypto";

// Minimal, dependency-free admin auth: one shared password (ADMIN_PASSWORD
// in .env), and a signed cookie so we don't need a session store or user
// table. This is intentionally simple — fine for a single-owner small
// business dashboard. Swap for real auth (NextAuth, Clerk, etc.) if this
// template grows multiple staff logins or role-based access.

export const ADMIN_COOKIE_NAME = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to your .env file (see .env.example)."
    );
  }
  return secret;
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  return createHmac("sha256", getSecret()).update("admin-session-v1").digest("hex");
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  let expected: string;
  try {
    expected = createSessionToken();
  } catch {
    return false;
  }
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
