import { KEYS, read, write } from "@/lib/storage";

/* The pact is the person's own list of rules, written before anyone is
   pressing them. The app never adds an investment to it, only a limit. */

export const PACT_LINE_IDS = [
  "noFirstContact",
  "noBorrowed",
  "wait24",
  "noOtp",
  "askBefore",
  "noChasingLosses",
] as const;

export type PactLineId = (typeof PACT_LINE_IDS)[number];

export type Pact = {
  /* Each line can be edited, so we keep the text, not only the tick. */
  lines: { id: PactLineId; text: string; kept: boolean }[];
  /* Line 5 has two blanks: an amount and a person. */
  askAbove: string;
  askWhom: string;
  monthlyLossLimit: string;
  signedAt: number | null;
};

export function emptyPact(texts: Record<PactLineId, string>): Pact {
  return {
    lines: PACT_LINE_IDS.map((id) => ({ id, text: texts[id], kept: true })),
    askAbove: "",
    askWhom: "",
    monthlyLossLimit: "",
    signedAt: null,
  };
}

export async function readPact(
  texts: Record<PactLineId, string>,
): Promise<Pact> {
  const saved = await read<Pact | null>(KEYS.pact, null);
  if (!saved) return emptyPact(texts);
  /* A pact written in Hindi must not turn into English because the person
     changed the language afterwards, so saved text wins. */
  return { ...emptyPact(texts), ...saved };
}

export async function writePact(pact: Pact): Promise<void> {
  await write(KEYS.pact, pact);
}

export function keptLines(pact: Pact): Pact["lines"] {
  return pact.lines.filter((line) => line.kept);
}
