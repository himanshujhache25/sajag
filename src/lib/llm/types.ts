// The shape of the model layer.
//
// Everything here is optional. The engine produces a verdict on the phone
// with no model involved, and that verdict is the answer. A model may add a
// note beside it, and may suggest a signal the lexicon missed, but it can
// never change a state. If the provider is missing, slow, or says something
// we do not allow, the app carries on exactly as if it were not configured.

import type { Severity } from "../engine/types";

export type LlmTask =
  | "explain"
  | "extraSignals"
  | "simplify"
  | "draftComplaint"
  | "translate";

/** Everything a provider is given. No phone numbers, no names: the caller
 *  redacts before it gets here, and `src/lib/engine/redact.ts` is what does
 *  it. */
export type LlmRequest = {
  task: LlmTask;
  /** The system prompt, from `prompts.ts`. */
  system: string;
  /** The user turn. Untrusted text is already wrapped in <message> tags. */
  user: string;
  /** Ask the provider for JSON. Advisory: we parse defensively either way. */
  json?: boolean;
  signal?: AbortSignal;
};

export type LlmReply = {
  text: string;
  /** For the ledger. Not a billing figure, just something honest to show. */
  bytesIn: number;
  bytesOut: number;
};

export type LlmProvider = {
  /** `none`, `gemini`, `openai-compatible`. Shown in About. */
  readonly name: string;
  /** False when the key or the model name is missing from the environment. */
  readonly configured: boolean;
  complete(req: LlmRequest): Promise<LlmReply>;
};

/** A signal the model thinks it has spotted, before we believe any of it. */
export type SignalCandidate = {
  id: string;
  /** Must appear in the original text, character for character. If it does
   *  not, the candidate is dropped: a model that cannot quote the message is
   *  not reading the message. */
  evidence: string;
  severity?: Severity;
  p?: number;
};

export const MODEL_TIMEOUT_MS = 6000;

/** At most two model signals, each worth at most this much. A model may
 *  nudge; it may not decide. */
export const MODEL_MAX_SIGNALS = 2;
export const MODEL_MAX_P = 0.2;
