// What we do with a signal a model claims to have found.
//
// The rule is evidence or nothing. A candidate survives only if the words it
// quotes are present in the original message, character for character. This
// is the cheapest possible defence against a model inventing a reason, and
// it costs one substring check.

import type { Signal } from "../engine/types";
import {
  MODEL_MAX_P,
  MODEL_MAX_SIGNALS,
  type SignalCandidate,
} from "./types";

export type AcceptResult = {
  accepted: Signal[];
  /** Why each rejected candidate was rejected. Shown in `/dev/gallery` and
   *  useful when a provider starts drifting. */
  rejected: Array<{ id: string; reason: string }>;
};

/** Models reflow whitespace even when told to quote exactly. Comparing on a
 *  single-spaced, case-folded copy is forgiving about that and about nothing
 *  else. */
function flatten(s: string): string {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * Filter model candidates down to the few we are willing to believe.
 *
 * - the evidence must be a substring of the original text
 * - the evidence must be long enough to mean something
 * - at most two survive, each capped at p 0.20
 * - everything kept is tagged `source: "model"` so the result screen can
 *   label it, and so the scorer can treat it as the weak hint it is
 *
 * `existingIds` stops a model taking credit for a signal the lexicon already
 * found on its own.
 */
export function acceptCandidates(
  candidates: SignalCandidate[],
  originalText: string,
  existingIds: readonly string[] = [],
): AcceptResult {
  const hay = flatten(originalText);
  const accepted: Signal[] = [];
  const rejected: Array<{ id: string; reason: string }> = [];
  const seen = new Set(existingIds);

  for (const c of candidates) {
    if (accepted.length >= MODEL_MAX_SIGNALS) {
      rejected.push({ id: c.id, reason: "over-limit" });
      continue;
    }
    if (!c.id || typeof c.evidence !== "string") {
      rejected.push({ id: c.id ?? "?", reason: "malformed" });
      continue;
    }
    if (seen.has(c.id)) {
      rejected.push({ id: c.id, reason: "duplicate" });
      continue;
    }

    const needle = flatten(c.evidence);
    // Four characters is nothing: "the" would match almost any message and
    // prove almost nothing.
    if (needle.length < 8) {
      rejected.push({ id: c.id, reason: "evidence-too-short" });
      continue;
    }
    const at = hay.indexOf(needle);
    if (at === -1) {
      rejected.push({ id: c.id, reason: "evidence-not-found" });
      continue;
    }

    seen.add(c.id);
    const p = Math.min(
      MODEL_MAX_P,
      typeof c.p === "number" && c.p > 0 ? c.p : MODEL_MAX_P,
    );
    accepted.push({
      id: c.id,
      // Never "hard", whatever the model asked for. A hard signal can carry
      // a verdict by itself, and that is not a decision a model gets to make.
      severity: "moderate",
      p,
      evidence: [{ start: at, end: at + needle.length, text: c.evidence.trim() }],
      titleKey: `signal.${c.id}.title`,
      whyKey: `signal.${c.id}.why`,
      basisKey: "basis.model",
      source: "model",
    });
  }

  return { accepted, rejected };
}

/**
 * Read a model's JSON reply without trusting any of its shape.
 *
 * Returns an empty list rather than throwing. A provider returning prose
 * where JSON was asked for is a normal Tuesday, not an exception.
 */
export function parseCandidates(raw: string): SignalCandidate[] {
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]");
  if (start === -1 || end <= start) return [];
  let data: unknown;
  try {
    data = JSON.parse(raw.slice(start, end + 1));
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];

  const out: SignalCandidate[] = [];
  for (const row of data.slice(0, 8)) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    if (typeof r.id !== "string" || typeof r.evidence !== "string") continue;
    out.push({
      id: r.id.slice(0, 64),
      evidence: r.evidence.slice(0, 400),
      p: typeof r.p === "number" ? r.p : undefined,
    });
  }
  return out;
}
