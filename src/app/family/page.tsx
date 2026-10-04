"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Button,
  ButtonLink,
  Panel,
  SectionLabel,
  TextField,
} from "@/components/ui";
import { LockIcon } from "@/components/icons";
import { useSettings } from "@/components/use-settings";
import { KEYS, read, write, appendLedger, type LedgerEntry } from "@/lib/storage";

type Trusted = { name: string; number: string; relation: string };

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

const SETUP_STEPS = [
  "lang",
  "bigText",
  "trusted",
  "install",
  "share",
  "pact",
] as const;

export default function FamilyPage() {
  const { t } = useSettings();
  const router = useRouter();
  const [trusted, setTrusted] = useState<Trusted | null>(null);
  const [saved, setSaved] = useState(false);
  const [alerts, setAlerts] = useState<LedgerEntry[]>([]);
  const [ticked, setTicked] = useState<string[]>([]);
  const [installer, setInstaller] = useState<InstallPrompt | null>(null);

  useEffect(() => {
    router.prefetch("/family/card");
    router.prefetch("/about");

    void read<Trusted | null>(KEYS.trusted, null).then((value) =>
      setTrusted(value ?? { name: "", number: "", relation: "" }),
    );
    void read<LedgerEntry[]>(KEYS.ledger, []).then((rows) =>
      setAlerts(rows.filter((r) => r.what === "ledger.what.share").slice(0, 5)),
    );
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstaller(event as InstallPrompt);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, [router]);

  const fmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "short" });

  return (
    <div className="screen">
      <header className="screen-head">
        <h1>{t("familyPage.title")}</h1>
      </header>

      <p className="banner" role="status">
        <LockIcon width={20} height={20} aria-hidden="true" />
        <span>{t("familyPage.setupSub")}</span>
      </p>

      <SectionLabel>{t("familyPage.forMe")}</SectionLabel>
      {trusted ? (
        <div className="stack-16">
          <TextField
            id="trusted-name"
            autoComplete="off"
            label={t("familyPage.trusted")}
            value={trusted.name}
            onChange={(e) => {
              setTrusted({ ...trusted, name: e.target.value });
              setSaved(false);
            }}
          />
          <TextField
            id="trusted-number"
            autoComplete="off"
            inputMode="tel"
            className="num"
            label={t("family.numberLabel")}
            value={trusted.number}
            onChange={(e) => {
              setTrusted({ ...trusted, number: e.target.value });
              setSaved(false);
            }}
          />
          <TextField
            id="trusted-relation"
            autoComplete="off"
            label={t("familyPage.relation")}
            value={trusted.relation}
            onChange={(e) => {
              setTrusted({ ...trusted, relation: e.target.value });
              setSaved(false);
            }}
          />
          <div className="run-row">
            <Button
              onClick={() => {
                void write(KEYS.trusted, trusted);
                void appendLedger({
                  at: Date.now(),
                  what: "ledger.what.trusted",
                  fields: ["name", "number"],
                  bytes: new TextEncoder().encode(trusted.name + trusted.number)
                    .length,
                  masked: [],
                });
                setSaved(true);
              }}
            >
              {t("familyPage.saveTrusted")}
            </Button>
            {saved ? (
              <span className="t-caption ink-2" aria-live="polite">
                {t("familyPage.savedTrusted")}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      <SectionLabel>{t("familyPage.lastAlerts")}</SectionLabel>
      {alerts.length === 0 ? (
        <p className="ink-2">{t("familyPage.noAlerts")}</p>
      ) : (
        <ul className="rule-list">
          {alerts.map((row) => (
            <li key={row.at} className="num">
              {fmt.format(row.at)} · {t(row.what)}
            </li>
          ))}
        </ul>
      )}

      <SectionLabel>{t("familyPage.setupTitle")}</SectionLabel>
      <p className="num t-caption ink-2">
        {t("familyPage.checklistDone", {
          done: ticked.length,
          total: SETUP_STEPS.length,
        })}
      </p>

      <ul id="caregiver-checklist" className="rule-list mt-16">
        {SETUP_STEPS.map((id, index) => (
          <li key={id}>
            <label className="check-line">
              <input
                type="checkbox"
                checked={ticked.includes(id)}
                onChange={(event) =>
                  setTicked(
                    event.target.checked
                      ? [...ticked, id]
                      : ticked.filter((x) => x !== id),
                  )
                }
              />
              <span className="num ink-2 check-n">{index + 1}.</span>
              <span className="check-body">
                <span className="t-tile">{t(`familyPage.setup.${id}`)}</span>

                {id === "lang" || id === "bigText" ? (
                  <Link href="/settings" className="inline-link mt-8">
                    {t("familyPage.openSettings")}
                  </Link>
                ) : null}

                {id === "install" ? (
                  <span className="mt-8" style={{ display: "block" }}>
                    {installer ? (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          void installer.prompt();
                          setInstaller(null);
                        }}
                      >
                        {t("familyPage.install")}
                      </Button>
                    ) : (
                      <span className="t-caption ink-2">
                        {t("familyPage.installManual")}
                      </span>
                    )}
                  </span>
                ) : null}

                {id === "share" ? <ShareDiagram t={t} /> : null}

                {id === "pact" ? (
                  <Link href="/pause/pact" className="inline-link mt-8">
                    {t("familyPage.openPact")}
                  </Link>
                ) : null}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="stack-12">
        <ButtonLink href="/family/card" variant="secondary" full>
          {t("card.open")}
        </ButtonLink>
        <p className="t-caption ink-2">{t("card.openLine")}</p>
        <ButtonLink href="/check" variant="secondary" full>
          {t("home.check")}
        </ButtonLink>
      </div>

      <Panel sunken>
        <p className="t-caption ink-2">{t("privacy.onDevice")}</p>
      </Panel>
    </div>
  );
}

function ShareDiagram({ t }: { t: (key: string) => string }) {
  const steps = [
    t("familyPage.shareHow1"),
    t("familyPage.shareHow2"),
    t("familyPage.shareHow3"),
  ];
  return (
    <span className="share-diagram">
      {steps.map((line, i) => (
        <span key={line} style={{ display: "block" }}>
          <svg viewBox="0 0 48 60" className="share-cell" role="img" aria-hidden="true">
            <rect
              x="6"
              y="4"
              width="36"
              height="52"
              rx="3"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            {i === 0 ? (
              <>
                <rect x="12" y="16" width="24" height="10" fill="var(--rule)" />
                <circle cx="24" cy="21" r="6" fill="none" stroke="var(--danger)" strokeWidth="2" />
              </>
            ) : null}
            {i === 1 ? (
              <>
                <circle cx="18" cy="30" r="3" fill="var(--ink)" />
                <circle cx="30" cy="24" r="3" fill="var(--ink)" />
                <circle cx="30" cy="36" r="3" fill="var(--ink)" />
                <path d="M20 29 L28 25 M20 31 L28 35" stroke="var(--ink)" strokeWidth="2" />
              </>
            ) : null}
            {i === 2 ? (
              <>
                <rect x="12" y="20" width="24" height="8" fill="none" stroke="var(--rule)" strokeWidth="2" />
                <rect x="12" y="32" width="24" height="8" fill="var(--danger)" />
              </>
            ) : null}
          </svg>
          <span className="t-caption ink-2" style={{ display: "block" }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
