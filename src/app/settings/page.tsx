"use client";

import { useState } from "react";

import { useSettings, type Settings } from "@/components/use-settings";
import {
  ActionTile,
  Button,
  Panel,
  SectionLabel,
  Segmented,
  Switch,
} from "@/components/ui";
import { BookIcon, LockIcon, GlobeIcon } from "@/components/icons";
import { clearAll } from "@/lib/storage";

export default function SettingsPage() {
  const { settings, set, t } = useSettings();
  const [confirming, setConfirming] = useState(false);
  const patch = (p: Partial<Settings>) => set(p);

  return (
    <div className="screen">
      <header className="screen-head">
        <h1>{t("settings.title")}</h1>
      </header>

      {/* Each label and the control it names are one group. They were flat
          siblings before, so the page rhythm could not tell "a heading and
          its control" from "two unrelated controls". */}
      <section className="screen-section">
        <SectionLabel>{t("settings.language")}</SectionLabel>
        <ActionTile
          href="/start"
          title={t("settings.language")}
          desc={t("start.langTitle")}
          icon={<GlobeIcon />}
        />
      </section>

      <section className="screen-section">
        <SectionLabel>{t("settings.textSize")}</SectionLabel>
        <div className="stack-16">
        <Segmented
          label={t("settings.textSize")}
          value={String(settings.textScale)}
          options={[
            { value: "1", label: "A" },
            { value: "1.25", label: "A A" },
            { value: "1.5", label: "A A A" },
          ]}
          onChange={(v) => patch({ textScale: Number(v) as Settings["textScale"] })}
        />
        <Segmented
          label={t("settings.contrast")}
          value={settings.contrast}
          options={[
            { value: "normal", label: t("settings.contrastNormal") },
            { value: "high", label: t("settings.contrastHigh") },
          ]}
          onChange={(v) => patch({ contrast: v })}
        />
        <Segmented
          label={t("settings.theme")}
          value={settings.theme}
          options={[
            { value: "light", label: t("settings.themeLight") },
            { value: "dark", label: t("settings.themeDark") },
            { value: "auto", label: t("settings.themeAuto") },
          ]}
          onChange={(v) => patch({ theme: v })}
        />
        </div>
      </section>

      <section className="screen-section">
        <SectionLabel>{t("settings.autoRead")}</SectionLabel>
        <div className="setting-list">
          <Switch
            label={t("settings.autoRead")}
            checked={settings.autoRead}
            onToggle={() => patch({ autoRead: !settings.autoRead })}
            onWord={t("common.yes")}
            offWord={t("common.no")}
          />
          <Switch
            label={t("settings.simpleMode")}
            checked={settings.simpleMode}
            onToggle={() => patch({ simpleMode: !settings.simpleMode })}
            onWord={t("common.yes")}
            offWord={t("common.no")}
          />
        </div>
      </section>

      <section className="screen-section">
        <SectionLabel>{t("settings.ledger")}</SectionLabel>
        <ActionTile
          href="/settings/ledger"
          title={t("settings.ledger")}
          icon={<BookIcon />}
        />
      </section>

      <section className="screen-section">
        <SectionLabel>{t("settings.eraseAll")}</SectionLabel>
        {/* The one destructive action with no undo: it wipes the store
            itself, so there would be nothing left to restore. Keeping the
            confirmation here is honest rather than inconsistent. */}
        {confirming ? (
          <Panel sunken>
            <p>{t("settings.eraseConfirm")}</p>
            <div className="stack-12 mt-16">
              <Button
                variant="emergency"
                full
                onClick={async () => {
                  await clearAll();
                  setConfirming(false);
                }}
              >
                {t("settings.eraseYes")}
              </Button>
              <Button variant="secondary" full onClick={() => setConfirming(false)}>
                {t("settings.eraseNo")}
              </Button>
            </div>
          </Panel>
        ) : (
          <Button variant="secondary" full onClick={() => setConfirming(true)}>
            {t("settings.eraseAll")}
          </Button>
        )}
      </section>

      <p className="privacy-line">
        <LockIcon width={18} height={18} aria-hidden="true" />
        {t("privacy.onDevice")}
      </p>
    </div>
  );
}
