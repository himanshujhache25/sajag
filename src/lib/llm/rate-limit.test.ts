import { beforeEach, describe, expect, it } from "vitest";
import {
  RATE_LIMIT,
  RATE_WINDOW_MS,
  clientKey,
  rateLimit,
  resetRateLimit,
} from "./rate-limit";

beforeEach(() => resetRateLimit());

describe("rateLimit", () => {
  it("allows up to the limit", () => {
    for (let i = 0; i < RATE_LIMIT; i++) {
      expect(rateLimit("a").ok).toBe(true);
    }
  });

  it("refuses the one after that", () => {
    for (let i = 0; i < RATE_LIMIT; i++) rateLimit("a");
    expect(rateLimit("a").ok).toBe(false);
  });

  it("counts each caller separately", () => {
    for (let i = 0; i < RATE_LIMIT; i++) rateLimit("a");
    expect(rateLimit("b").ok).toBe(true);
  });

  it("forgives once the window has passed", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < RATE_LIMIT; i++) rateLimit("a", t0);
    expect(rateLimit("a", t0).ok).toBe(false);
    expect(rateLimit("a", t0 + RATE_WINDOW_MS + 1).ok).toBe(true);
  });

  it("counts down what is left", () => {
    expect(rateLimit("a").remaining).toBe(RATE_LIMIT - 1);
    expect(rateLimit("a").remaining).toBe(RATE_LIMIT - 2);
  });
});

describe("clientKey", () => {
  const req = (headers: Record<string, string>) =>
    new Request("https://example.test/", { headers });

  it("takes the first hop of a forwarded chain", () => {
    expect(clientKey(req({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe("1.1.1.1");
  });

  it("falls back to the real-ip header", () => {
    expect(clientKey(req({ "x-real-ip": "3.3.3.3" }))).toBe("3.3.3.3");
  });

  it("has an answer when there is no header at all", () => {
    expect(clientKey(req({}))).toBe("unknown");
  });
});
