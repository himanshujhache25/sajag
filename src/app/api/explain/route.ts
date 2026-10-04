// POST /api/explain
//
// Behind the "ask in your own words" box on /learn. The model is given one
// concept card and told to answer using only that card, so the worst case
// is a clumsy restatement of something we wrote and checked, rather than an
// invention about a company.
//
// When this is not configured, /learn still answers questions through the
// on-device search. That is the normal case, not a degraded one.

import { z } from "zod";
import { NextResponse } from "next/server";
import { conceptById, conceptAsSpeech } from "@/content/learn";
import { filterModelText } from "@/lib/llm/filter";
import {
  OVERSIZE,
  badRequest,
  json,
  limit,
  logFailure,
  notConfigured,
  readJson,
  tooBig,
} from "@/lib/llm/http";
import { asMessage, simplifyPrompt } from "@/lib/llm/prompts";
import { getProvider } from "@/lib/llm/provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  q: z.string().min(1).max(200),
  lang: z.string().min(2).max(8),
  conceptId: z.string().max(64).optional(),
});

export async function POST(req: Request): Promise<NextResponse> {
  const limited = limit(req);
  if (limited) return limited;

  const raw = await readJson(req);
  if (raw === OVERSIZE) return tooBig();

  const parsed = Body.safeParse(raw);
  if (!parsed.success) return badRequest();
  const { q, lang, conceptId } = parsed.data;

  const provider = getProvider();
  if (!provider.configured) return notConfigured();

  const concept = conceptId ? conceptById(lang, conceptId) : undefined;
  // No card, no answer. An open-ended investing question answered by a
  // general-purpose model is exactly the thing this app exists to warn
  // people about.
  if (!concept) return json({ note: undefined });

  try {
    const reply = await provider.complete({
      task: "simplify",
      system: simplifyPrompt(lang),
      user: `Use only this explanation:\n\n${conceptAsSpeech(concept)}\n\nThe question:\n${asMessage(q)}`,
    });
    const note = filterModelText(reply.text);
    if (!note) logFailure("explain", "note failed the filter");
    return json({ note: note ?? undefined });
  } catch {
    logFailure("explain", "provider failed or timed out");
    return json({});
  }
}
