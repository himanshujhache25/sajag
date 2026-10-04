// The routes, exercised directly.
//
// No provider is configured in a test run, which is the case that matters
// most: every route must turn that into a clean 501 that the client can
// ignore, never a crash and never a hang.

import { beforeEach, describe, expect, it } from "vitest";
import { POST as enrich } from "@/app/api/enrich/route";
import { POST as explain } from "@/app/api/explain/route";
import { resetRateLimit } from "@/lib/llm/rate-limit";

beforeEach(() => resetRateLimit());

function post(url: string, body: unknown, ip = "9.9.9.9"): Request {
  const text = JSON.stringify(body);
  return new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": String(text.length),
      "x-forwarded-for": ip,
    },
    body: text,
  });
}

const GOOD_ENRICH = {
  text: "Join our VIP group, guaranteed profit every week.",
  lang: "hi",
  task: "explain" as const,
  engine: { state: "danger", signalIds: ["S1"] },
};

describe("POST /api/enrich", () => {
  it("says so plainly when no provider is configured", async () => {
    const res = await enrich(post("https://x.test/api/enrich", GOOD_ENRICH));
    expect(res.status).toBe(501);
    expect(await res.json()).toEqual({ error: "not-configured" });
  });

  it("rejects a body that is missing fields", async () => {
    const res = await enrich(post("https://x.test/api/enrich", { lang: "hi" }));
    expect(res.status).toBe(400);
  });

  it("rejects an unknown task", async () => {
    const res = await enrich(
      post("https://x.test/api/enrich", { ...GOOD_ENRICH, task: "exfiltrate" }),
    );
    expect(res.status).toBe(400);
  });

  it("rejects text over the 2000 character limit", async () => {
    const res = await enrich(
      post("https://x.test/api/enrich", { ...GOOD_ENRICH, text: "क".repeat(2001) }),
    );
    expect(res.status).toBe(400);
  });

  it("turns away an oversized body with 413, before parsing it", async () => {
    const req = new Request("https://x.test/api/enrich", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": "999999",
        "x-forwarded-for": "9.9.9.9",
      },
      body: "{}",
    });
    expect((await enrich(req)).status).toBe(413);
  });

  it("rejects a body that is not JSON at all", async () => {
    const req = new Request("https://x.test/api/enrich", {
      method: "POST",
      headers: { "x-forwarded-for": "9.9.9.9" },
      body: "not json {{{",
    });
    expect((await enrich(req)).status).toBe(400);
  });

  it("rate limits a caller that will not stop", async () => {
    let last = 0;
    for (let i = 0; i < 25; i++) {
      last = (await enrich(post("https://x.test/api/enrich", GOOD_ENRICH, "7.7.7.7"))).status;
    }
    expect(last).toBe(429);
  });

  it("does not rate limit a different caller", async () => {
    for (let i = 0; i < 25; i++) {
      await enrich(post("https://x.test/api/enrich", GOOD_ENRICH, "7.7.7.7"));
    }
    const res = await enrich(post("https://x.test/api/enrich", GOOD_ENRICH, "8.8.8.8"));
    expect(res.status).toBe(501);
  });
});

describe("POST /api/explain", () => {
  const body = { q: "SIP का मतलब क्या है?", lang: "hi", conceptId: "sip" };

  it("says so plainly when no provider is configured", async () => {
    const res = await explain(post("https://x.test/api/explain", body));
    expect(res.status).toBe(501);
  });

  it("rejects a question over 200 characters", async () => {
    const res = await explain(
      post("https://x.test/api/explain", { ...body, q: "a".repeat(201) }),
    );
    expect(res.status).toBe(400);
  });

  it("rejects a missing question", async () => {
    const res = await explain(post("https://x.test/api/explain", { lang: "hi" }));
    expect(res.status).toBe(400);
  });
});

describe("the routes never cache", () => {
  it("sets no-store", async () => {
    const res = await enrich(post("https://x.test/api/enrich", GOOD_ENRICH));
    expect(res.headers.get("cache-control")).toBe("no-store");
  });
});
