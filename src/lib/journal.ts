import { KEYS, read, write } from "@/lib/storage";

/* The decision journal. One entry per thing the person was about to do, with
   the reason they had at the time. The point is the revisit: tomorrow they
   read their own words back, not ours. */

export type WhoseMoney = "savings" | "emergency" | "borrowed" | "other";
export type Prompt =
  | "readMyself"
  | "someoneTold"
  | "groupOrChannel"
  | "sawScreenshot"
  | "fearOfMissing"
  | "winBackLoss"
  | "other";

export type JournalEntry = {
  id: string;
  at: number;
  what: string;
  prompt?: Prompt;
  whoseMoney?: WhoseMoney;
  /* A band, never an exact figure: a journal is not a statement. */
  band?: "under5k" | "5kTo50k" | "50kTo5l" | "over5l";
  worstICanBear: string;
  howLong: string;
  howWrongLooks: string;
  /* Filled in on the revisit. */
  revisitedAt?: number;
  reasonsStillHold?: "yes" | "no" | "unknown";
  whatChanged?: string;
  /* Set when the entry came from the breaker's "I will wait" exit. */
  waitUntil?: number;
};

export type JournalStatus = "waiting" | "revisit" | "done";

export function statusOf(entry: JournalEntry, now = Date.now()): JournalStatus {
  if (entry.revisitedAt) return "done";
  if (entry.waitUntil && now < entry.waitUntil) return "waiting";
  return "revisit";
}

export async function readJournal(): Promise<JournalEntry[]> {
  return read<JournalEntry[]>(KEYS.journal, []);
}

export async function addEntry(entry: JournalEntry): Promise<void> {
  const list = await readJournal();
  await write(KEYS.journal, [entry, ...list].slice(0, 200));
}

export async function updateEntry(
  id: string,
  patch: Partial<JournalEntry>,
): Promise<void> {
  const list = await readJournal();
  await write(
    KEYS.journal,
    list.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
  );
}

/* One plain sentence built only from the person's own entries, shown from
   five entries up. It counts; it does not advise. */
export type Insight = { key: string; count: number; total: number };

export function insightFrom(entries: JournalEntry[]): Insight | null {
  if (entries.length < 5) return null;
  const tally = new Map<Prompt, number>();
  for (const entry of entries) {
    if (!entry.prompt) continue;
    tally.set(entry.prompt, (tally.get(entry.prompt) ?? 0) + 1);
  }
  let top: Prompt | null = null;
  let count = 0;
  for (const [prompt, n] of tally) {
    if (n > count) {
      top = prompt;
      count = n;
    }
  }
  if (!top || count < 2) return null;
  return { key: `journal.insight.${top}`, count, total: entries.length };
}
