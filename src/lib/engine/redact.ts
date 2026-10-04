export type RedactionType =
  | "aadhaar"
  | "pan"
  | "card"
  | "otp"
  | "account"
  | "email"
  | "own-phone";

export type Redaction = { type: RedactionType; count: number };

export type Redacted = { text: string; redactions: Redaction[] };

/* Runs before anything leaves the phone or is written to storage.
   The other party's phone, UPI ID, links and registration numbers are kept:
   they are exactly what we were asked to check. */

const OTP_WORDS = /(otp|code|pin|cvv|ओटीपी|कोड|पिन)/giu;
const ACCOUNT_WORDS = /(a\/c|a\/c no|account|acct|खाता|अकाउंट)/giu;
const OWN_PHONE =
  /((?:my|mera|mere)\s+(?:mobile\s+|phone\s+|contact\s+)?(?:number|no\.?|num)|मेरा\s+(?:मोबाइल\s+)?नंबर)\D{0,6}((?:\+91[\s-]?)?\d{10})/giu;

function luhn(digits: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

function mask(length: number, tail = 0): string {
  const stars = "•".repeat(Math.max(3, length - tail));
  return stars;
}

type Edit = { start: number; end: number; with: string; type: RedactionType };

function near(text: string, at: number, words: RegExp, window = 30): boolean {
  const from = Math.max(0, at - window);
  const slice = text.slice(from, at + window);
  words.lastIndex = 0;
  return words.test(slice);
}

export function redactForSending(input: string): Redacted {
  const edits: Edit[] = [];

  const add = (start: number, end: number, type: RedactionType) => {
    if (edits.some((e) => start < e.end && end > e.start)) return;
    edits.push({ start, end, with: mask(end - start), type });
  };

  for (const m of input.matchAll(OWN_PHONE)) {
    const at = (m.index ?? 0) + m[0].indexOf(m[2]);
    add(at, at + m[2].length, "own-phone");
  }

  for (const m of input.matchAll(
    /\b[A-Z]{5}\d{4}[A-Z]\b/g,
  )) {
    add(m.index ?? 0, (m.index ?? 0) + m[0].length, "pan");
  }

  for (const m of input.matchAll(/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g)) {
    add(m.index ?? 0, (m.index ?? 0) + m[0].length, "email");
  }

  /* Longest digit groups first, so a 16-digit card is not eaten by a
     12-digit Aadhaar rule. */
  for (const m of input.matchAll(/\b(?:\d[ -]?){9,19}\b/g)) {
    const at = m.index ?? 0;
    const raw = m[0];
    const digits = raw.replace(/\D/g, "");
    const end = at + raw.length;

    if (digits.length >= 13 && digits.length <= 19 && luhn(digits)) {
      add(at, end, "card");
      continue;
    }
    if (digits.length === 12 && !near(input, at, ACCOUNT_WORDS)) {
      add(at, end, "aadhaar");
      continue;
    }
    if (digits.length >= 9 && digits.length <= 18 && near(input, at, ACCOUNT_WORDS)) {
      add(at, end, "account");
    }
  }

  for (const m of input.matchAll(/\b\d{4,8}\b/g)) {
    const at = m.index ?? 0;
    if (near(input, at, OTP_WORDS)) add(at, at + m[0].length, "otp");
  }

  edits.sort((a, b) => a.start - b.start);

  let out = "";
  let cursor = 0;
  for (const edit of edits) {
    out += input.slice(cursor, edit.start) + edit.with;
    cursor = edit.end;
  }
  out += input.slice(cursor);

  const counts = new Map<RedactionType, number>();
  for (const edit of edits) {
    counts.set(edit.type, (counts.get(edit.type) ?? 0) + 1);
  }

  return {
    text: out,
    redactions: [...counts].map(([type, count]) => ({ type, count })),
  };
}
