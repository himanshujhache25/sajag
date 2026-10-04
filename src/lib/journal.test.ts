import { describe, expect, it } from "vitest";

import { insightFrom, statusOf, type JournalEntry } from "./journal";

function entry(over: Partial<JournalEntry> = {}): JournalEntry {
  return {
    id: "1",
    at: 0,
    what: "",
    worstICanBear: "",
    howLong: "",
    howWrongLooks: "",
    ...over,
  };
}

describe("statusOf", () => {
  it("is done once it has been revisited", () => {
    expect(statusOf(entry({ revisitedAt: 5 }))).toBe("done");
  });

  it("waits while the 24 hours are still running", () => {
    expect(statusOf(entry({ waitUntil: 100 }), 50)).toBe("waiting");
  });

  it("asks for a revisit once the wait is over", () => {
    expect(statusOf(entry({ waitUntil: 100 }), 200)).toBe("revisit");
  });

  it("asks for a revisit when there was no wait at all", () => {
    expect(statusOf(entry(), 200)).toBe("revisit");
  });
});

describe("insightFrom", () => {
  it("says nothing under five entries", () => {
    const few = [1, 2, 3, 4].map((n) =>
      entry({ id: `${n}`, prompt: "groupOrChannel" }),
    );
    expect(insightFrom(few)).toBeNull();
  });

  it("counts the commonest prompt", () => {
    const list = [
      entry({ id: "1", prompt: "groupOrChannel" }),
      entry({ id: "2", prompt: "groupOrChannel" }),
      entry({ id: "3", prompt: "groupOrChannel" }),
      entry({ id: "4", prompt: "readMyself" }),
      entry({ id: "5", prompt: "someoneTold" }),
    ];
    expect(insightFrom(list)).toEqual({
      key: "journal.insight.groupOrChannel",
      count: 3,
      total: 5,
    });
  });

  it("says nothing when no prompt repeats", () => {
    const list = [
      entry({ id: "1", prompt: "groupOrChannel" }),
      entry({ id: "2", prompt: "readMyself" }),
      entry({ id: "3", prompt: "someoneTold" }),
      entry({ id: "4", prompt: "sawScreenshot" }),
      entry({ id: "5", prompt: "other" }),
    ];
    expect(insightFrom(list)).toBeNull();
  });
});
