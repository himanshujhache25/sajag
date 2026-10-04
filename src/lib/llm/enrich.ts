// Putting a model's contribution next to the engine's verdict.
//
// The important thing in this file is what it does *not* do. It never
// recomputes the state, the probability or the hard stop. Those come off the
// phone, from `check()`, before any network call is made, and they are
// copied through untouched. A model can add a paragraph and at most two
// weakly-weighted signals to read; it cannot move the needle, because the
// needle is not recalculated here.
//
// Written as one function so there is exactly one place to look when someone
// asks "can the model change the answer?". The answer is no, and this is why.

import type { Verdict } from "../engine/check";
import { acceptCandidates } from "./accept";
import { filterModelText } from "./filter";
import type { SignalCandidate } from "./types";

export type ModelOutput = {
  /** Raw prose from the provider. Filtered here, not by the caller. */
  explanation?: string;
  /** Raw candidates from the provider. Checked against the text here. */
  extraSignals?: SignalCandidate[];
};

export type Enriched = Verdict & {
  /** Present only when a model wrote something we were willing to show. The
   *  UI labels it "कंप्यूटर ने लिखा, गलती हो सकती है". */
  modelNote?: string;
  /** Why the note is missing, for `/dev/gallery`. Never shown to a person. */
  modelNoteDropped?: string;
};

/**
 * Fold whatever the model returned into the verdict, safely.
 *
 * `original` is the redacted text the model was shown; model evidence is
 * checked against it. If anything is missing, malformed or disallowed, the
 * verdict comes back exactly as it went in.
 */
export function enrichVerdict(
  verdict: Verdict,
  model: ModelOutput | null | undefined,
): Enriched {
  if (!model) return { ...verdict };

  const out: Enriched = { ...verdict };

  if (model.explanation) {
    const note = filterModelText(model.explanation);
    if (note) out.modelNote = note;
    else out.modelNoteDropped = "filtered";
  }

  if (model.extraSignals?.length) {
    const { accepted } = acceptCandidates(
      model.extraSignals,
      verdict.redaction.text,
      verdict.signals.map((s) => s.id),
    );
    if (accepted.length) out.signals = [...verdict.signals, ...accepted];
  }

  // state, p, rawP, hardStop and everything else are carried over by the
  // spread above and deliberately never reassigned. Do not add a rescore
  // here; that would hand a stranger's server a say in what a person is
  // told about their own money.
  return out;
}
