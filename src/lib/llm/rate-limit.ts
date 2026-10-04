// A token bucket in memory.
//
// Not a real rate limiter: it is per-process, so a serverless deployment on
// several instances will let through several times this. That is fine for
// what it defends against. It is here to stop one script turning our model
// budget into someone else's, and to make a careless loop in our own client
// show up as a 429 instead of a bill.

const WINDOW_MS = 60_000;
const LIMIT = 20;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/** Drop buckets that have aged out, so a long-running process does not grow
 *  a map entry for every IP that has ever visited. */
function sweep(now: number): void {
  if (buckets.size < 1000) return;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export type RateResult = { ok: boolean; remaining: number; resetAt: number };

export function rateLimit(key: string, now = Date.now()): RateResult {
  sweep(now);
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + WINDOW_MS };
    buckets.set(key, fresh);
    return { ok: true, remaining: LIMIT - 1, resetAt: fresh.resetAt };
  }
  existing.count += 1;
  return {
    ok: existing.count <= LIMIT,
    remaining: Math.max(0, LIMIT - existing.count),
    resetAt: existing.resetAt,
  };
}

/**
 * Work out who is asking.
 *
 * Behind a proxy the socket address is the proxy, so the forwarded header is
 * the only thing available. It is also trivially forged, which is another
 * reason not to mistake this for a security control.
 */
export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Only for tests, so one test's traffic cannot fail the next one. */
export function resetRateLimit(): void {
  buckets.clear();
}

export { LIMIT as RATE_LIMIT, WINDOW_MS as RATE_WINDOW_MS };
