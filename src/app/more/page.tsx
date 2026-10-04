"use client";

/* The fourth tab. Four doors and nothing else: it exists so the tab bar can
   stay at four items while the app keeps nine screens.
   Section 5.8 of docs/UI_SPEC.md. */

import {
  BookIcon,
  FamilyIcon,
  HistoryIcon,
  LedgerIcon,
  SettingsIcon,
} from "@/components/icons";
import { ActionTile } from "@/components/ui";
import { useSettings } from "@/components/use-settings";

export default function MorePage() {
  const { t } = useSettings();
  return (
    <>
      <h1 className="mt-24">{t("ui.moreTitle")}</h1>

      <div className="mt-20 stack-12">
        <ActionTile
          href="/learn"
          icon={<BookIcon width={28} height={28} />}
          title={t("home.learn")}
          desc={t("learn.line")}
        />
        <ActionTile
          href="/family"
          icon={<FamilyIcon width={28} height={28} />}
          title={t("home.family")}
          desc={t("family.line")}
        />
        <ActionTile
          href="/history"
          icon={<HistoryIcon width={28} height={28} />}
          title={t("home.historyShort")}
          desc={t("history.line")}
        />
        <ActionTile
          href="/simulate"
          icon={<LedgerIcon width={28} height={28} />}
          title={t("sim.title")}
          desc={t("sim.line")}
        />
        <ActionTile
          href="/settings"
          icon={<SettingsIcon width={28} height={28} />}
          title={t("nav.settings")}
          desc={t("settings.line")}
        />
      </div>
    </>
  );
}
