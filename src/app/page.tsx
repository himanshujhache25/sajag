"use client";

/* ============================================================================
   Home.

   The previous version put eleven blocks and thirty-three tappable things on
   the front door: a hero, a composer card, two action tiles, four trap rows,
   a three-step explainer, a privacy panel, three quick tiles and a tip. Each
   block was defensible on its own, and the sum was a contents page shouting
   at someone who had arrived holding exactly one question. It ran 2.8
   screens on a phone and used 39% of the width on a desktop.

   A front door has to do five things, and the order matters more than the
   count:

     1. say what this is, in the words of the question the person already has
     2. offer the one action that answers it
     3. point at the other doors, for people whose question is different
     4. prove the promise, in one line rather than a panel
     5. get out of the way

   So: anything urgent, the question, the one action, three doors, one line
   of proof. The four trap rows moved to /learn, where someone who wants to
   study them will go. History and Family live behind the More tab. The tip
   of the day went entirely — a daily aphorism is not worth a block on the
   one screen where someone is deciding whether to send money.

   Everything above the fold is fixed at render. The priority slot and the
   last check depend on the clock and on storage, which differ between the
   server and the browser, so they wait for `mounted` and take no space until
   they have something true to say. That is what keeps the page from jumping
   under a thumb that is already moving.
   Sections 2 and 5.1 of docs/UI_SPEC.md.
   ========================================================================== */

import { useEffect, useMemo, useState } from "react";

import { BookIcon, LifebuoyIcon, PauseIcon } from "@/components/icons";
import { ActionTile, InlineLink, Note, SectionLabel } from "@/components/ui";
import { LastCheckRow, QuickEntryCard } from "@/components/ui/home";
import { useSettings } from "@/components/use-settings";
import { useMounted } from "@/lib/use-mounted";
import { readHistory, type HistoryEntry } from "@/lib/history";
import { KEYS, read } from "@/lib/storage";

export default function Home() {
  const { t } = useSettings();
  const mounted = useMounted();

  /* The late-night line reads the clock, and the clock differs between the
     server and the browser. Reading it during the first render is what
     produced the old hydration mismatch, so it waits for `mounted`. */
  const late = useMemo(() => {
    if (!mounted) return false;
    const hour = new Date().getHours();
    /* 23:00 to 05:00. Pressure selling works late at night, when there is
       nobody awake to ask. We do not block anything; we just say it. */
    return hour >= 23 || hour < 5;
  }, [mounted]);

  const [last, setLast] = useState<HistoryEntry | null>(null);
  const [hasPact, setHasPact] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      /* The pact is read raw rather than through `readPact`, which needs the
         six line texts to build an empty one. Home only wants to know
         whether a signed pact exists, not what it says. */
      const [history, pact] = await Promise.all([
        readHistory(),
        read<unknown>(KEYS.pact, null),
      ]);
      if (!alive) return;
      setLast(history[0] ?? null);
      setHasPact(!!pact);
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* At most one thing competes with the hero, and only if it is more urgent
     than checking a message. A screen that shows both has told the person
     nothing. */
  const priority = late ? "late" : hasPact ? "pact" : null;

  return (
    <div className="home">
      {priority === "late" ? (
        <div className="home-priority">
          <Note>
            {t("home.lateNight")}{" "}
            <InlineLink href="/pause">{t("home.pauseOpen")}</InlineLink>
          </Note>
        </div>
      ) : null}

      {priority === "pact" ? (
        <div className="home-priority">
          <Note>
            <InlineLink href="/pause/pact">{t("home.pactLine")}</InlineLink>
          </Note>
        </div>
      ) : null}

      {/* The question the person is already asking, in their own words. Not
          "Welcome to Sajag", not "Protect yourself from fraud". */}
      <header className="home-hero">
        <h1>{t("home.hero")}</h1>
        <p className="t-lead ink-2 mt-8">{t("home.heroLead")}</p>
      </header>

      {/* The one action. Everything below answers a different question. */}
      <section className="home-action" aria-label={t("quick.check")}>
        <QuickEntryCard />
        {/* The privacy promise was a whole panel with a byte counter. This is
            the same promise in one line, which is as much as anyone reads
            while holding a message they are frightened of. */}
        <p className="home-proof">{t("home.privacyLine")}</p>
      </section>

      {/* The other doors. Someone whose money has already gone must not have
          to read past a composer to find the helpline, so Madad is first and
          carries the only red on the page. */}
      <section className="home-doors" aria-labelledby="home-doors-label">
        <SectionLabel id="home-doors-label">{t("home.more")}</SectionLabel>
        <div className="mt-12 stack-12">
          <ActionTile
            href="/madad"
            tone="danger"
            tag="1930"
            icon={<LifebuoyIcon width={28} height={28} />}
            title={t("home.madad")}
            desc={t("home.madadLine")}
          />
          <ActionTile
            href="/pause"
            tone="caution"
            icon={<PauseIcon width={28} height={28} />}
            title={t("home.pause")}
            desc={t("home.pauseLine")}
          />
          <ActionTile
            href="/learn"
            icon={<BookIcon width={28} height={28} />}
            title={t("home.learn")}
            desc={t("home.learnLine")}
          />
        </div>
      </section>

      {/* Only once there is something true to say. Before the first check
          this section does not exist at all, rather than explaining three
          steps to someone who has not asked for them. */}
      {last ? (
        <section className="home-last" aria-labelledby="home-last-label">
          <SectionLabel id="home-last-label">{t("home.lastCheck")}</SectionLabel>
          <div className="mt-12">
            <LastCheckRow entry={last} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
