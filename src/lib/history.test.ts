import { describe, expect, test, beforeEach, vi } from "vitest";

/* `storage` talks to IndexedDB through idb-keyval, which does not exist in
   Node and whose failures `read` deliberately swallows. Left alone, every
   write here would silently no-op and these tests would pass vacuously.
   A plain Map stands in for the database so we are testing the history
   rules rather than the browser. */
const store = new Map<string, unknown>();
vi.mock("idb-keyval", () => ({
  get: async (key: string) => store.get(key),
  set: async (key: string, value: unknown) => void store.set(key, value),
  del: async (key: string) => void store.delete(key),
  keys: async () => [...store.keys()],
}));

import {
  addToHistory,
  clearHistory,
  readHistory,
  restoreHistory,
  HISTORY_DAYS,
  type HistoryEntry,
} from "./history";
import type { Verdict } from "./engine/check";

/* Undo is only worth having if the thing it restores is the thing that was
   lost. These tests pin that down, and pin down the one case where putting
   something back would be wrong. */

const verdict = (state: string): Verdict =>
  ({ state, signals: [{ id: "S01" }] }) as unknown as Verdict;

beforeEach(() => {
  store.clear();
});

describe("restoreHistory", () => {
  test("puts back exactly what a clear removed", async () => {
    await addToHistory("first message", verdict("HIGH_RISK"), 1_000);
    await addToHistory("second message", verdict("NO_STRONG_FLAGS"), 2_000);

    const before = await readHistory(2_000);
    expect(before).toHaveLength(2);

    await clearHistory();
    expect(await readHistory(2_000)).toHaveLength(0);

    await restoreHistory(before, 2_000);
    const after = await readHistory(2_000);

    expect(after).toHaveLength(2);
    expect(after.map((e) => e.text)).toEqual([
      "second message",
      "first message",
    ]);
    /* Order matters: the list is newest-first, and an undo that quietly
       reshuffled it would look like a different list to the person. */
    expect(after).toEqual(before);
  });

  test("overwrites rather than merges, so a clear cannot double entries", async () => {
    await addToHistory("only message", verdict("SOME_CONCERNS"), 1_000);
    const before = await readHistory(1_000);

    /* Restore without clearing first. If this merged, we would see two. */
    await restoreHistory(before, 1_000);

    expect(await readHistory(1_000)).toHaveLength(1);
  });

  test("will not resurrect an entry that has aged past the retention window", async () => {
    const stale: HistoryEntry = {
      id: "old",
      at: 0,
      text: "older than thirty days",
      state: "NO_STRONG_FLAGS",
      signalIds: [],
    };
    const fresh: HistoryEntry = {
      id: "new",
      at: 10_000,
      text: "still inside the window",
      state: "NO_STRONG_FLAGS",
      signalIds: [],
    };

    /* Chosen so the window boundary falls between the two: the stale entry
       is 30 days + 5s old, the fresh one 30 days - 5s old. */
    const now = HISTORY_DAYS * 86_400_000 + 5_000;
    await restoreHistory([fresh, stale], now);

    const after = await readHistory(now);
    expect(after.map((e) => e.id)).toEqual(["new"]);
  });

  test("restoring an empty list is a no-op, not a crash", async () => {
    await restoreHistory([], 1_000);
    expect(await readHistory(1_000)).toEqual([]);
  });
});
