// Shared plumbing for the API routes.
//
// Every route here is an optional extra. None of them is on the path to a
// verdict, so every one of them is allowed to fail, and the client is
// written to carry on when they do.
//
// The one rule that is not negotiable: no message text is ever logged. A
// person pasting a message that has their money and their panic in it has
// not agreed to it being written down on a server, and a stack trace that
// happens to include the body is a leak like any other.

import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "./rate-limit";

export function json(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export const notConfigured = () => json({ error: "not-configured" }, 501);
export const tooBig = () => json({ error: "too-large" }, 413);
export const badRequest = () => json({ error: "bad-request" }, 400);
export const tooMany = (resetAt: number) =>
  json({ error: "rate-limited", resetAt }, 429);

const MAX_BODY = 8 * 1024;

/**
 * Read a JSON body, refusing anything oversized.
 *
 * Checks the declared length first so an enormous body is turned away before
 * we buffer it, then the real length, because the header is a claim.
 */
export async function readJson(req: Request): Promise<unknown | typeof OVERSIZE> {
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY) return OVERSIZE;
  const text = await req.text();
  if (text.length > MAX_BODY) return OVERSIZE;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const OVERSIZE = Symbol("oversize");

/** The rate-limit check, in the one line every route starts with. */
export function limit(req: Request): NextResponse | null {
  const r = rateLimit(clientKey(req));
  return r.ok ? null : tooMany(r.resetAt);
}

/**
 * Log that something went wrong, without saying what the person wrote.
 *
 * Takes a reason we chose, never an exception, because an exception message
 * from a JSON parser can contain the text that failed to parse.
 */
export function logFailure(route: string, reason: string): void {
  console.warn(`[${route}] ${reason}`);
}
