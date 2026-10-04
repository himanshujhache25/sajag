"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, DateBlock, EmptyState, Panel, SectionLabel, Tag } from "@/components/ui";
import { UndoBar, useUndo } from "@/components/ui/undo";
import { useSettings } from "@/components/use-settings";
import {
  clearHistory,
  HISTORY_DAYS,
  readHistory,
  restoreHistory,
  type HistoryEntry,
} from "@/lib/history";
import { setLastResult, useEngine } from "@/lib/use-engine";

const TONE: Record<string, "danger" | "caution" | "ok" | "action"> = {
  HIGH_RISK: "danger",
  MULTIPLE_SIGNS: "danger",
  SOME_SIGNS: "caution",
  NO_SIGNS: "ok",
  NOT_ENOUGH: "action",
};

function parts(at: number) {
  const d = new Date(at);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleString("en-IN", { month: "short" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function HistoryPage() {
  const { t } = useSettings();
  const router = useRouter();
  const run = useEngine();
  const [entries, setEntries] = useState<HistoryEntry[] | null>(null);
  const { pending, offer, undo, dismiss } = useUndo();

  useEffect(() => {
    let alive = true;
    void readHistory().then((list) => {
      if (alive) setEntries(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function reopen(entry: HistoryEntry) {
    const input = { text: entry.text };
    const verdict = await run(input);
    setLastResult(input, verdict);
    router.push("/check/result");
  }

  return (
    <div className="screen">
      <header className="screen-head">
        <h1>{t("history.title")}</h1>
        <p className="t-lead ink-2">
          {t("history.retention", { days: HISTORY_DAYS })}
        </p>
      </header>

      {entries === null ? null : entries.length === 0 ? (
        <EmptyState word={t("history.title")} line={t("history.empty")} />
      ) : (
        <>
          <section className="screen-section">
            <SectionLabel>{t("history.title")}</SectionLabel>
            <ul className="stack-12">
            {entries.map((entry) => {
              const p = parts(entry.at);
              return (
                <li key={entry.id}>
                  <Panel className="journal-entry">
                    <DateBlock day={p.day} month={p.month} />
                    <div className="journal-body">
                      <Tag tone={TONE[entry.state] ?? "action"}>
                        {t(`state.${entry.state}.stamp`)}
                      </Tag>
                      <p className="t-caption ink-2 num mt-8">{p.time}</p>
                      <p className="mt-8 clamp-2">{entry.text}</p>
                      <div className="mt-16">
                        <Button variant="secondary" onClick={() => void reopen(entry)}>
                          {t("history.open")}
                        </Button>
                      </div>
                    </div>
                  </Panel>
                </li>
              );
            })}
          </ul>
          </section>

          <div>
            <Button
              variant="text"
              onClick={() => {
                /* Hold the list before it goes. The screen empties at once —
                   waiting on storage would make the tap feel ignored — and
                   the bar carries the way back. */
                const removed = entries;
                setEntries([]);
                void clearHistory().then(() => {
                  offer({
                    message: t("history.cleared", { count: removed.length }),
                    restore: async () => {
                      await restoreHistory(removed);
                      setEntries(removed);
                    },
                  });
                });
              }}
            >
              {t("history.clear")}
            </Button>
          </div>
        </>
      )}

      <UndoBar pending={pending} onUndo={undo} onDismiss={dismiss} />
    </div>
  );
}
