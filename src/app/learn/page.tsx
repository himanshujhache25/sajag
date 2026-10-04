"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ActionTile, Button, EmptyState, Note, SectionLabel, TextField } from "@/components/ui";
import { PATTERNS, PatternRow } from "@/components/ui/home";
import { useSettings } from "@/components/use-settings";
import { BookIcon } from "@/components/icons";
import { conceptsFor, searchConcepts } from "@/content/learn";

export default function LearnPage() {
  const { settings, t } = useSettings();
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    router.prefetch("/simulate");
  }, [router]);

  const pack = useMemo(() => conceptsFor(settings.lang), [settings.lang]);
  const shown = useMemo(() => searchConcepts(pack.concepts, query), [pack.concepts, query]);
  const searching = query.trim().length > 0;

  return (
    <div className="screen">
      <header className="screen-head">
        <h1>{t("learn.title")}</h1>
        <p className="t-lead ink-2">{t("learn.sub")}</p>
      </header>

      {pack.needsReview ? <Note>{t("learn.beta")}</Note> : null}

      <section className="screen-section">
        <TextField
          id="learn-search"
          type="search"
          label={t("learn.searchLabel")}
          placeholder={t("learn.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {searching ? (
          <p aria-live="polite" className="t-caption ink-2">
            {shown.length > 0 ? t("learn.found", { n: shown.length }) : t("learn.noResult")}
          </p>
        ) : null}

        {searching && shown.length === 0 ? (
          <EmptyState
            word={t("learn.noResult")}
            line={t("learn.noResultLine")}
            action={
              <Button variant="secondary" onClick={() => setQuery("")}>
                {t("learn.showAll")}
              </Button>
            }
          />
        ) : null}
      </section>

      {/* The four shapes almost every investment scam takes. These were four
          rows on Home, where they competed with the one action; recognition
          is worth teaching but not at the cost of the front door. Here they
          sit above the twelve concepts, because a shape someone can match
          against the message in their hand is a faster way in than a
          glossary. Hidden while searching, which is a request for something
          specific. Each row opens the real message in the real composer, so
          "see what it looks like" ends in a check rather than a lecture. */}
      {searching ? null : (
        <section className="screen-section" aria-labelledby="learn-traps-label">
          <SectionLabel id="learn-traps-label">{t("home.traps")}</SectionLabel>
          <p className="t-small ink-2">{t("home.trapsSub")}</p>
          <div className="stack-12">
            {PATTERNS.map(({ sample, key, Icon }) => (
              <PatternRow
                key={sample}
                sample={sample}
                title={t(key)}
                icon={<Icon width={24} height={24} />}
              />
            ))}
          </div>
        </section>
      )}

      <section className="screen-section">
        {searching ? null : (
          <SectionLabel>{t("learn.conceptsLabel")}</SectionLabel>
        )}

        <nav aria-label={t("learn.title")} className="screen-tiles stack-12">
          {shown.map((c) => (
            <ActionTile
              key={c.id}
              href={`/learn/${c.id}`}
              title={c.title}
              desc={c.line}
              icon={<BookIcon />}
              tag={String(c.n)}
            />
          ))}
        </nav>
      </section>

      <p className="t-caption ink-2">{t("learn.infoNotAdvice")}</p>
    </div>
  );
}
