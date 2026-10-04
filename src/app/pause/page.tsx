"use client";

import { ActionTile } from "@/components/ui";
import { useSettings } from "@/components/use-settings";
import { BookIcon, ClockIcon, PenIcon, LockIcon } from "@/components/icons";

export default function PausePage() {
  const { t } = useSettings();
  return (
    <div className="screen">
      <header className="screen-head">
        <h1>{t("pause.title")}</h1>
        <p className="t-lead ink-2">{t("pause.sub")}</p>
      </header>

      <nav aria-label={t("pause.title")} className="screen-tiles stack-12">
        <ActionTile
          href="/pause/pact"
          title={t("pause.pact")}
          desc={t("pause.pactLine")}
          icon={<PenIcon />}
        />
        <ActionTile
          href="/pause/breaker"
          title={t("pause.breaker")}
          desc={t("pause.breakerLine")}
          icon={<ClockIcon />}
          tone="caution"
        />
        <ActionTile
          href="/pause/journal"
          title={t("pause.journal")}
          desc={t("pause.journalLine")}
          icon={<BookIcon />}
        />
      </nav>

      <p className="privacy-line">
        <LockIcon width={18} height={18} aria-hidden="true" />
        {t("privacy.onDevice")}
      </p>
    </div>
  );
}
