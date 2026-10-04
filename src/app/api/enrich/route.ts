// POST /api/enrich
//
// The client has already run the engine on the phone and already shown the
// person their answer. This route is asked afterwards, and whatever it
// returns is folded in beside that answer by `enrichVerdict`, which cannot
// change the verdict. If this route is slow, missing, or says something we
// do not allow, the screen simply never changes.
//
// The text arriving here has been through `redactForSending` on the phone.
// We do not log it, and we do not store it.

import { z } from "zod";
import { NextResponse } from "next/server";
import { acceptCandidates, parseCandidates } from "@/lib/llm/accept";
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
import { asMessage, explainPrompt, extraSignalsPrompt } from "@/lib/llm/prompts";
import { getProvider } from "@/lib/llm/provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  text: z.string().min(1).max(2000),
  lang: z.string().min(2).max(8),
  task: z.enum(["explain", "extra"]),
  engine: z.object({
    state: z.string().min(1).max(40),
    signalIds: z.array(z.string().max(64)).max(40),
  }),
});

export async function POST(req: Request): Promise<NextResponse> {
  const limited = limit(req);
  if (limited) return limited;

  const raw = await readJson(req);
  if (raw === OVERSIZE) return tooBig();

  const parsed = Body.safeParse(raw);
  if (!parsed.success) return badRequest();
  const { text, lang, task, engine } = parsed.data;

  const provider = getProvider();
  if (!provider.configured) return notConfigured();

  try {
    if (task === "explain") {
      const reply = await provider.complete({
        task: "explain",
        system: explainPrompt(lang),
        user: `The checker's outcome: ${engine.state}. Signals it found: ${
          engine.signalIds.join(", ") || "none"
        }.\n\n${asMessage(text)}`,
      });
      const explanation = filterModelText(reply.text);
      // A filtered-out answer is not an error. The person already has the
      // engine's explanation; they simply do not get a second paragraph.
      if (!explanation) logFailure("enrich", "explanation failed the filter");
      return json({ explanation: explanation ?? undefined });
    }

    const reply = await provider.complete({
      task: "extraSignals",
      system: extraSignalsPrompt(lang),
      user: asMessage(text),
      json: true,
    });
    // Checked here as well as in the client, because a route that hands back
    // unverified model claims is a route someone will eventually trust.
    const { accepted } = acceptCandidates(
      parseCandidates(reply.text),
      text,
      engine.signalIds,
    );
    return json({ extraSignals: accepted });
  } catch {
    // Timeouts and provider outages are ordinary. Say nothing useful to a
    // caller and nothing at all about the message.
    logFailure("enrich", "provider failed or timed out");
    return json({});
  }
}
