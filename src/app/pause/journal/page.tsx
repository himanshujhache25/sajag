"use client";

import { useEffect, useState } from "react";

import {
  Button,
  Chip,
  DateBlock,
  EmptyState,
  Note,
  Panel,
  Tag,
  TextArea,
} from "@/components/ui";
import { Sheet } from "@/components/ui/overlay";
import { AppBar } from "@/components/ui/nav";
import { useSettings } from "@/components/use-settings";
import { buildIcs, downloadIcs } from "@/lib/ics";
import {
  addEntry,
  insightFrom,
  readJournal,
  statusOf,
  updateEntry,
  type JournalEntry,
  type Prompt,
  type WhoseMoney,
} from "@/lib/journal";

const PROMPTS: Prompt[] = [
  "readMyself",
  "someoneTold",
  "groupOrChannel",
  "sawScreenshot",
  "fearOfMissing",
  "winBackLoss",
  "other",
];
const WHOSE: WhoseMoney[] = ["savings", "emergency", "borrowed", "other"];
const BANDS = ["under5k", "5kTo50k", "50kTo5l", "over5l"] as const;

const STATUS_TONE = {
  waiting: "caution",
  revisit: "action",
  done: "ok",
} as const;

export default function JournalPage() {
  const { settings, t } = useSettings();
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [revisiting, setRevisiting] = useState<JournalEntry | null>(null);

  const reload = () => void readJournal().then(setEntries);
  useEffect(reload, []);

  const insight = entries ? insightFrom(entries) : null;
  const fmt = new Intl.DateTimeFormat(
    settings.lang === "en" ? "en-IN" : "hi-IN",
    { day: "2-digit", month: "short" },
  );

  return (
    <>
      <AppBar />
      <h1>{t("journal.title")}</h1>
      <p className="t-lead ink-2 mt-8">{t("journal.sub")}</p>

      <div className="mt-20">
        <Button full onClick={() => setNewOpen(true)}>
          {t("journal.new")}
        </Button>
      </div>

      {insight ? (
        <div className="mt-24">
          <Note>
            {t(insight.key, { count: insight.count, total: insight.total })}
          </Note>
        </div>
      ) : null}

      {entries === null ? null : entries.length === 0 ? (
        <div className="mt-32">
          <EmptyState word={t("journal.title")} line={t("journal.empty")} />
        </div>
      ) : (
        <ul className="stack-12 mt-24">
          {entries.map((entry) => {
            const status = statusOf(entry);
            return (
              <li key={entry.id}>
                <Panel className="journal-entry">
                  <DateBlock
                    day={String(new Date(entry.at).getDate())}
                    month={fmt.format(entry.at).replace(/^\d+\s*/, "")}
                  />
                  <div className="journal-body">
                    <p className="t-serif t-lead">{entry.what}</p>
                    <div className="mt-8">
                      <Tag tone={STATUS_TONE[status]}>
                        {t(`journal.status.${status}`)}
                      </Tag>
                    </div>
                    {status === "revisit" ? (
                      <div className="mt-12">
                        <Button
                          variant="secondary"
                          size="md"
                          onClick={() => setRevisiting(entry)}
                        >
                          {t("journal.revisit")}
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </Panel>
              </li>
            );
          })}
        </ul>
      )}

      <NewEntry
        open={newOpen}
        onClose={() => setNewOpen(false)}
        onSaved={() => {
          setNewOpen(false);
          reload();
        }}
        t={t}
      />

      <Sheet
        open={revisiting !== null}
        onClose={() => setRevisiting(null)}
        title={t("journal.revisitTitle")}
        closeLabel={t("common.close")}
      >
        {revisiting ? (
          <Revisit
            entry={revisiting}
            t={t}
            onDone={() => {
              setRevisiting(null);
              reload();
            }}
          />
        ) : null}
      </Sheet>
    </>
  );
}

function NewEntry({
  open,
  onClose,
  onSaved,
  t,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) {
  const [what, setWhat] = useState("");
  const [prompt, setPrompt] = useState<Prompt>();
  const [whose, setWhose] = useState<WhoseMoney>();
  const [band, setBand] = useState<JournalEntry["band"]>();
  const [worst, setWorst] = useState("");
  const [howLong, setHowLong] = useState("");
  const [howWrong, setHowWrong] = useState("");

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={t("journal.new")}
      closeLabel={t("common.close")}
    >
      <div className="stack-20">
        <TextArea
          rows={2}
          label={t("journal.what")}
          value={what}
          onChange={(e) => setWhat(e.target.value)}
        />

        <Pick
          legend={t("journal.prompt")}
          options={PROMPTS.map((id) => ({
            id,
            label: t(`journal.prompt.${id}`),
          }))}
          value={prompt}
          onChange={setPrompt}
        />
        <Pick
          legend={t("journal.whose")}
          options={WHOSE.map((id) => ({ id, label: t(`journal.whose.${id}`) }))}
          value={whose}
          onChange={setWhose}
        />
        <Pick
          legend={t("journal.band")}
          options={BANDS.map((id) => ({ id, label: t(`journal.band.${id}`) }))}
          value={band}
          onChange={setBand}
        />

        <TextArea
          rows={2}
          label={t("journal.worst")}
          value={worst}
          onChange={(e) => setWorst(e.target.value)}
        />
        <TextArea
          rows={2}
          label={t("journal.howLong")}
          value={howLong}
          onChange={(e) => setHowLong(e.target.value)}
        />
        <TextArea
          rows={2}
          label={t("journal.howWrong")}
          value={howWrong}
          onChange={(e) => setHowWrong(e.target.value)}
        />
      </div>

      <div className="stack-12 mt-24">
        <Button
          full
          disabled={what.trim().length === 0}
          onClick={() => {
            const now = Date.now();
            void addEntry({
              id: `${now}`,
              at: now,
              what,
              prompt,
              whoseMoney: whose,
              band,
              worstICanBear: worst,
              howLong,
              howWrongLooks: howWrong,
              waitUntil: now + 86_400_000,
            }).then(onSaved);
          }}
        >
          {t("journal.save")}
        </Button>

        <Button
          variant="secondary"
          full
          onClick={() => {
            const start = new Date(Date.now() + 86_400_000);
            downloadIcs(
              "sajag-kal.ics",
              buildIcs({
                uid: `sajag-journal-${Date.now()}`,
                start,
                title: t("journal.reminderTitle"),
                note: what,
              }),
            );
          }}
        >
          {t("journal.reminder")}
        </Button>
      </div>
    </Sheet>
  );
}

function Revisit({
  entry,
  t,
  onDone,
}: {
  entry: JournalEntry;
  t: (key: string) => string;
  onDone: () => void;
}) {
  const [still, setStill] = useState<"yes" | "no" | "unknown">();
  const [changed, setChanged] = useState("");

  return (
    <>
      <p className="t-serif t-lead">{entry.what}</p>
      {entry.howWrongLooks ? (
        <p className="t-small ink-2 mt-8">{entry.howWrongLooks}</p>
      ) : null}

      <div className="mt-24">
        <Pick
          legend={t("journal.stillHold")}
          options={[
            { id: "yes" as const, label: t("common.yes") },
            { id: "no" as const, label: t("common.no") },
            { id: "unknown" as const, label: t("common.dontKnow") },
          ]}
          value={still}
          onChange={setStill}
        />
      </div>

      <div className="mt-20">
        <TextArea
          rows={2}
          label={t("journal.whatChanged")}
          value={changed}
          onChange={(e) => setChanged(e.target.value)}
        />
      </div>

      <div className="mt-24">
        <Button
          full
          onClick={() => {
            void updateEntry(entry.id, {
              revisitedAt: Date.now(),
              reasonsStillHold: still,
              whatChanged: changed,
            }).then(onDone);
          }}
        >
          {t("journal.close")}
        </Button>
      </div>
    </>
  );
}

function Pick<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { id: T; label: string }[];
  value: T | undefined;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="field-label">{legend}</legend>
      <div className="chip-row mt-8">
        {options.map((option) => (
          <Chip
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onSelect={() => onChange(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
