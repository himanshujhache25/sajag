import { describe, expect, it } from "vitest";
import { acceptCandidates, parseCandidates } from "./accept";
import { MODEL_MAX_P } from "./types";

const TEXT =
  "Sir join our VIP group today, only 2 seats left, our analyst gives sure profit every week.";

describe("acceptCandidates", () => {
  it("accepts a candidate that quotes the message", () => {
    const { accepted } = acceptCandidates(
      [{ id: "false-scarcity", evidence: "only 2 seats left" }],
      TEXT,
    );
    expect(accepted).toHaveLength(1);
    expect(accepted[0].id).toBe("false-scarcity");
    expect(accepted[0].source).toBe("model");
  });

  it("points the evidence span at the real position in the text", () => {
    const { accepted } = acceptCandidates(
      [{ id: "false-scarcity", evidence: "only 2 seats left" }],
      TEXT,
    );
    const { start, end } = accepted[0].evidence[0];
    expect(TEXT.toLowerCase().slice(start, end)).toBe("only 2 seats left");
  });

  it("drops a candidate whose evidence is not in the message", () => {
    const { accepted, rejected } = acceptCandidates(
      [{ id: "invented", evidence: "he promised me a Mercedes" }],
      TEXT,
    );
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toBe("evidence-not-found");
  });

  it("forgives reflowed whitespace and casing", () => {
    const { accepted } = acceptCandidates(
      [{ id: "scarcity", evidence: "  Only 2   Seats Left\n" }],
      TEXT,
    );
    expect(accepted).toHaveLength(1);
  });

  it("drops evidence too short to prove anything", () => {
    const { rejected } = acceptCandidates([{ id: "x", evidence: "sir" }], TEXT);
    expect(rejected[0].reason).toBe("evidence-too-short");
  });

  it("keeps at most two", () => {
    const { accepted, rejected } = acceptCandidates(
      [
        { id: "a", evidence: "only 2 seats left" },
        { id: "b", evidence: "sure profit every week" },
        { id: "c", evidence: "join our VIP group" },
      ],
      TEXT,
    );
    expect(accepted).toHaveLength(2);
    expect(rejected).toEqual([{ id: "c", reason: "over-limit" }]);
  });

  it("caps p at 0.20 however much the model asks for", () => {
    const { accepted } = acceptCandidates(
      [{ id: "greedy", evidence: "only 2 seats left", p: 0.99 }],
      TEXT,
    );
    expect(accepted[0].p).toBe(MODEL_MAX_P);
  });

  it("never lets a model signal be hard, however it is labelled", () => {
    const { accepted } = acceptCandidates(
      [{ id: "pushy", evidence: "only 2 seats left", severity: "hard" }],
      TEXT,
    );
    expect(accepted[0].severity).toBe("moderate");
  });

  it("does not let a model re-claim a signal the engine already found", () => {
    const { accepted, rejected } = acceptCandidates(
      [{ id: "guaranteed-return", evidence: "sure profit every week" }],
      TEXT,
      ["guaranteed-return"],
    );
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toBe("duplicate");
  });

  it("survives malformed rows", () => {
    const { accepted } = acceptCandidates(
      [{ id: "", evidence: "only 2 seats left" }],
      TEXT,
    );
    expect(accepted).toHaveLength(0);
  });
});

describe("parseCandidates", () => {
  it("reads a plain array", () => {
    const out = parseCandidates('[{"id":"a","evidence":"only 2 seats left"}]');
    expect(out).toHaveLength(1);
  });

  it("digs the array out of chatty prose", () => {
    const out = parseCandidates(
      'Sure! Here you go:\n[{"id":"a","evidence":"only 2 seats left"}]\nHope that helps.',
    );
    expect(out[0].id).toBe("a");
  });

  it("returns nothing for broken JSON instead of throwing", () => {
    expect(parseCandidates("[{id: a,,,")).toEqual([]);
  });

  it("returns nothing when there is no array at all", () => {
    expect(parseCandidates("I cannot help with that.")).toEqual([]);
  });

  it("skips rows missing an id or evidence", () => {
    const out = parseCandidates('[{"id":"a"},{"evidence":"x"},{"id":"b","evidence":"only 2 seats left"}]');
    expect(out.map((c) => c.id)).toEqual(["b"]);
  });
});
