"use client";

import { useState } from "react";
import { useSettings } from "@/components/use-settings";
import { appendLedger } from "@/lib/storage";
import type { Concept } from "@/content/learn/types";

/* The "ask in your own words" box.
 *
 * Three things keep this from becoming a chatbot, which section 8.7 forbids.
 * There is no thread: one question, one answer, and asking again replaces
 * what was there. The card is chosen by the on-device search, not by the
 * model, and the model is told to use only that card. And the answer is
 * always shown underneath the card's own words, never instead of them.
 *
 * When no provider is configured this component renders nothing at all, so
 * the ordinary build of this app has no ask box and loses nothing. */
export function AskBox({ concept }: { concept: Concept }) {
  const { settings, t } = useSettings();
  const [q, setQ] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "asking" | "off" | "failed">("idle");

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const question = q.trim();
    if (!question || state === "asking") return;

    setState("asking");
    setNote(null);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          q: question,
          lang: settings.lang,
          conceptId: concept.id,
        }),
      });

      // 501 means nobody has configured a model. That is the normal build,
      // not a fault, so the box quietly removes itself rather than showing
      // an error about something the person cannot fix.
      if (res.status === 501) {
        setState("off");
        return;
      }
      if (!res.ok) {
        setState("failed");
        return;
      }

      // The question left the phone, so it goes in the ledger like anything
      // else that leaves the phone.
      await appendLedger({
        at: Date.now(),
        what: "ledger.what.ask",
        fields: ["question", "lang", "conceptId"],
        bytes: new TextEncoder().encode(question).length,
        masked: [],
      });

      const data = (await res.json()) as { note?: string };
      if (data.note) {
        setNote(data.note);
        setState("idle");
      } else {
        // The model said nothing we were willing to show. Say so plainly
        // and point back at the card, which is the better answer anyway.
        setState("failed");
      }
    } catch {
      setState("failed");
    }
  }

  if (state === "off") return null;

  return (
    <section className="mt-5 border-[1.5px] border-rule bg-paper-deep p-3">
      <form onSubmit={ask}>
        <label className="mb-1 block text-[0.85rem] text-ink-2" htmlFor="ask">
          {t("learn.askTitle")}
        </label>
        <p className="mb-2 text-[0.82rem] text-ink-2">{t("learn.askNote")}</p>
        <input
          id="ask"
          type="text"
          value={q}
          maxLength={200}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("learn.askPlaceholder")}
          className="min-h-13 w-full border-[1.5px] border-ink bg-paper px-3 py-2 text-ink placeholder:text-ink-2"
        />
        <button
          type="submit"
          disabled={state === "asking" || q.trim().length === 0}
          className="mt-2 min-h-12 w-full border-[1.5px] border-ink bg-paper px-3 py-2 disabled:opacity-50"
        >
          {state === "asking" ? t("learn.asking") : t("learn.ask")}
        </button>
      </form>

      <p aria-live="polite">
        {note ? (
          <span className="mt-3 block">
            <span className="quote">
              {note}
            </span>
            {/* Required by section 7.8 on every model-written block. */}
            <span className="mt-2 block text-[0.8rem] text-ink-2">
              {t("learn.machineWrote")}
            </span>
          </span>
        ) : null}
        {state === "failed" ? (
          <span className="mt-3 block text-[0.9rem] text-ink-2">
            {t("learn.askFailed")}
          </span>
        ) : null}
      </p>
    </section>
  );
}
