import { describe, expect, it } from "vitest";

import { findClaims } from "./claims";
import { extract } from "./extract";
import { LENS_MIN_WORDS, readLens } from "./lens";
import { normalise } from "./normalise";

function parse(text: string) {
  const n = normalise(text);
  return { n, e: extract(n) };
}

function claimIds(text: string): string[] {
  const { n, e } = parse(text);
  return findClaims({ normalised: n, extraction: e }).map((claim) => claim.id);
}

function statusOf(text: string, id: string) {
  const { n, e } = parse(text);
  return findClaims({ normalised: n, extraction: e }).find(
    (claim) => claim.id === id,
  )?.status;
}

describe("claims", () => {
  it("marks a guarantee as against the rules", () => {
    expect(statusOf("Guaranteed returns every month", "C_GUARANTEE")).toBe(
      "AGAINST_RULES",
    );
  });

  it("marks a SEBI approved group as against the rules", () => {
    expect(statusOf("Our SEBI approved group gives daily calls", "C_SEBI_APPROVED")).toBe(
      "AGAINST_RULES",
    );
  });

  it("marks insider information as against the rules", () => {
    expect(statusOf("We get insider news before the announcement", "C_INSIDER")).toBe(
      "AGAINST_RULES",
    );
  });

  it("marks a return figure as unverifiable", () => {
    expect(statusOf("You will get 20% per month on your money", "C_RETURN_FIGURE")).toBe(
      "CANNOT_BE_VERIFIED",
    );
  });

  it("marks member profit screenshots as unverifiable", () => {
    expect(statusOf("Dekho aaj ka profit of our members", "C_FAKE_PROOF")).toBe(
      "CANNOT_BE_VERIFIED",
    );
  });

  it("marks scarcity as needing context", () => {
    expect(statusOf("Only 20 seats left, hurry", "C_URGENCY")).toBe("NEEDS_CONTEXT");
  });

  it("never uses a verdict word as a status", () => {
    const allowed = new Set([
      "AGAINST_RULES",
      "CANNOT_BE_VERIFIED",
      "CHECK_ELSEWHERE",
      "NEEDS_CONTEXT",
    ]);
    const { n, e } = parse("Guaranteed 20% per month, only 20 seats, insider news");
    for (const claim of findClaims({ normalised: n, extraction: e })) {
      expect(allowed.has(claim.status)).toBe(true);
    }
  });

  it("finds nothing in an ordinary message", () => {
    expect(claimIds("Papa, I reached the office safely.")).toHaveLength(0);
  });

  it("does not raise a claim for a phrase that is being warned about", () => {
    expect(claimIds("Beware of people who promise guaranteed returns")).not.toContain(
      "C_GUARANTEE",
    );
  });
});

const TEACHING_TEXT =
  "A mutual fund means a pooled investment where many people put money together and a fund manager buys shares. For example, an index fund simply tracks the index. However, the value can go down as well as up, and mutual fund investments are subject to market risk. As per the SEBI master circular on mutual funds, every scheme must publish its documents.";

const SELLING_TEXT =
  "Join now and book your seat in our premium package. Only a few seats are left today, hurry up before the offer closes. Our plan fee is Rs 4999 for one month of sure shot calls. Click the link and WhatsApp me on 9876543210 to start earning from tomorrow itself, our accuracy is 100% accurate.";

describe("lens", () => {
  it("stays hidden for short texts", () => {
    const { n, e } = parse("Guaranteed profit, join now");
    const lens = readLens(n, e);
    expect(lens.shown).toBe(false);
    expect(lens.wordCount).toBeLessThan(LENS_MIN_WORDS);
  });

  it("shows for a long enough text", () => {
    const { n, e } = parse(TEACHING_TEXT);
    expect(readLens(n, e).shown).toBe(true);
  });

  it("reads an explainer as teaching and evidenced", () => {
    const { n, e } = parse(TEACHING_TEXT);
    const lens = readLens(n, e);
    expect(lens.selling).toBeLessThan(0.4);
    expect(lens.assertion).toBeLessThan(0.4);
  });

  it("reads a pitch as selling and asserting", () => {
    const { n, e } = parse(SELLING_TEXT);
    const lens = readLens(n, e);
    expect(lens.selling).toBeGreaterThan(0.6);
    expect(lens.assertion).toBeGreaterThan(0.6);
  });

  it("stays inside zero and one", () => {
    for (const text of [TEACHING_TEXT, SELLING_TEXT, SELLING_TEXT.repeat(3)]) {
      const { n, e } = parse(text);
      const lens = readLens(n, e);
      expect(lens.selling).toBeGreaterThanOrEqual(0);
      expect(lens.selling).toBeLessThanOrEqual(1);
      expect(lens.assertion).toBeGreaterThanOrEqual(0);
      expect(lens.assertion).toBeLessThanOrEqual(1);
    }
  });

  it("is deterministic", () => {
    const { n, e } = parse(SELLING_TEXT);
    expect(readLens(n, e)).toEqual(readLens(n, e));
  });
});
