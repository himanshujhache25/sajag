import { KEYS, read, write } from "@/lib/storage";

/* "मेरा मामला": everything the person told the Madad wizard, plus what they
   have already done about it. It stays on the phone. We keep it because the
   first hour is the hour that matters and nobody should have to remember
   their own transaction ID while they are shaking. */

export type WhenSent = "now" | "today" | "week" | "older";
export type HowSent = "upi" | "bank" | "card" | "crypto" | "cash";
export type Promised =
  | "sureProfit"
  | "double"
  | "ipo"
  | "feeToWithdraw"
  | "other";
export type Proof =
  | "utr"
  | "screenshots"
  | "handle"
  | "app"
  | "website"
  | "recording"
  | "statement";

export type TimelineRow = { id: string; when: string; what: string };

export type CaseFile = {
  startedAt: number;
  whenSent?: WhenSent;
  howSent: HowSent[];
  amount: string;
  /* Who the money went to and where it was arranged. Free text, because a
     person in a panic will not sort it into fields for us. */
  toWhom: string;
  promised: Promised[];
  promisedNote: string;
  proof: Proof[];
  /* Their own details for the 1930 script. Never sent anywhere. */
  callerName: string;
  callerPlace: string;
  transactionId: string;
  /* What has been done since. */
  ackNumber: string;
  done: string[];
  timeline: TimelineRow[];
};

export function emptyCase(now = Date.now()): CaseFile {
  return {
    startedAt: now,
    howSent: [],
    amount: "",
    toWhom: "",
    promised: [],
    promisedNote: "",
    proof: [],
    callerName: "",
    callerPlace: "",
    transactionId: "",
    ackNumber: "",
    done: [],
    timeline: [],
  };
}

export async function readCase(): Promise<CaseFile> {
  const saved = await read<CaseFile | null>(KEYS.case, null);
  return saved ? { ...emptyCase(saved.startedAt), ...saved } : emptyCase();
}

export async function writeCase(file: CaseFile): Promise<void> {
  await write(KEYS.case, file);
}

export async function clearCase(): Promise<void> {
  await write(KEYS.case, emptyCase());
}

/* Indian grouping, the way a bank statement writes it: 1,00,000 not 100,000.
   Done by hand on the digits so it can run while the person is still typing. */
export function groupIndian(digits: string): string {
  const clean = digits.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  if (clean.length <= 3) return clean;
  const last3 = clean.slice(-3);
  const rest = clean.slice(0, -3);
  return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}`;
}

/* The money is gone; whether a transfer can still be stopped depends on how
   it moved. Only transfers reach a bank or a UPI helpline. */
export function wasTransfer(file: CaseFile): boolean {
  return file.howSent.some((how) => how === "upi" || how === "bank");
}
