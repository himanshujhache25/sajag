import { get, set, del, keys } from "idb-keyval";

/* Everything the app remembers lives on the phone. Keys are listed here so
   "erase everything" really erases everything. */
export const KEYS = {
  history: "sajag.history",
  pact: "sajag.pact",
  journal: "sajag.journal",
  case: "sajag.case",
  trusted: "sajag.trusted",
  ledger: "sajag.ledger",
  feedback: "sajag.feedback",
} as const;

/* "This reading felt wrong." Kept on the phone so the person can show it to
   whoever helps them. Nothing is sent anywhere. */
export type Feedback = { at: number; state: string; note: string };

export async function saveFeedback(entry: Feedback): Promise<void> {
  const list = await read<Feedback[]>(KEYS.feedback, []);
  list.unshift(entry);
  await write(KEYS.feedback, list.slice(0, 50));
}

export type LedgerEntry = {
  at: number;
  what: string;
  fields: string[];
  bytes: number;
  masked: string[];
};

export async function read<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await get<T>(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function write<T>(key: string, value: T): Promise<void> {
  try {
    await set(key, value);
  } catch {
    /* storage full or blocked: the session copy still works */
  }
}

export async function appendLedger(entry: LedgerEntry): Promise<void> {
  const list = await read<LedgerEntry[]>(KEYS.ledger, []);
  list.unshift(entry);
  await write(KEYS.ledger, list.slice(0, 200));
}

export async function clearAll(): Promise<void> {
  try {
    const all = await keys();
    await Promise.all(
      all
        .filter((k) => typeof k === "string" && k.startsWith("sajag."))
        .map((k) => del(k)),
    );
  } catch {
    /* nothing stored yet */
  }
  try {
    window.localStorage.removeItem("sajag.settings.v1");
  } catch {
    /* storage blocked */
  }
}
