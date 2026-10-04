import type { Verdict } from "@/lib/engine/check";
import { KEYS, read, write } from "@/lib/storage";

/* Thirty days, the retention we promise on the first screen. Nothing is
   kept longer, and the person can wipe it at any time. */
export const HISTORY_DAYS = 30;
const MAX_ENTRIES = 50;

export type HistoryEntry = {
  id: string;
  at: number;
  /* The text the person actually checked, kept so they can reopen a result.
     It never leaves the phone. */
  text: string;
  state: Verdict["state"];
  signalIds: string[];
};

function isFresh(entry: HistoryEntry, now: number): boolean {
  return now - entry.at < HISTORY_DAYS * 86_400_000;
}

export async function readHistory(now = Date.now()): Promise<HistoryEntry[]> {
  const list = await read<HistoryEntry[]>(KEYS.history, []);
  const fresh = list.filter((entry) => isFresh(entry, now));
  if (fresh.length !== list.length) await write(KEYS.history, fresh);
  return fresh;
}

export async function addToHistory(
  text: string,
  verdict: Verdict,
  now = Date.now(),
): Promise<void> {
  const list = await readHistory(now);
  const entry: HistoryEntry = {
    id: `${now}`,
    at: now,
    text,
    state: verdict.state,
    signalIds: verdict.signals.map((signal) => signal.id),
  };
  await write(KEYS.history, [entry, ...list].slice(0, MAX_ENTRIES));
}

export async function clearHistory(): Promise<void> {
  await write(KEYS.history, []);
}

/* Put back a list that was just cleared, for the undo bar.

   This overwrites rather than merges. The only caller is an undo offered
   immediately after a clear, so the list being restored is the whole list as
   it stood a moment ago; merging would be a chance to resurrect entries that
   had already aged past HISTORY_DAYS. The freshness filter is applied again
   on the way in for the same reason. */
export async function restoreHistory(
  entries: HistoryEntry[],
  now = Date.now(),
): Promise<void> {
  const fresh = entries.filter((entry) => isFresh(entry, now));
  await write(KEYS.history, fresh.slice(0, MAX_ENTRIES));
}
