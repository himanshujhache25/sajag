"use client";

import { useEffect, useState } from "react";

import { useSettings } from "@/components/use-settings";
import { EmptyState, KeyValue, SectionLabel } from "@/components/ui";
import { LockIcon } from "@/components/icons";
import { KEYS, read, type LedgerEntry } from "@/lib/storage";

export default function LedgerPage() {
  const { settings, t } = useSettings();
  const [rows, setRows] = useState<LedgerEntry[] | null>(null);

  useEffect(() => {
    read<LedgerEntry[]>(KEYS.ledger, []).then(setRows);
  }, []);

  const fmt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const en = settings.lang === "en";

  return (
    <>
      <h1>{t("settings.ledger")}</h1>
      <p className="t-lead ink-2 mt-8">{t("privacy.onDevice")}</p>

      {rows === null ? null : rows.length === 0 ? (
        <div className="mt-24">
          <EmptyState
            word={t("settings.ledger")}
            line={t("settings.ledgerEmpty")}
          />
        </div>
      ) : (
        <>
          <SectionLabel>{t("settings.ledger")}</SectionLabel>
          <KeyValue
            head={[en ? "When" : "कब", en ? "What" : "क्या"]}
            rows={rows.map((r) => ({
              k: fmt.format(r.at),
              v: (
                <>
                  <span style={{ display: "block" }}>{t(r.what)}</span>
                  <span className="t-caption ink-2" style={{ display: "block" }}>
                    {r.fields.join(", ")}
                  </span>
                  <span className="t-caption ink-2 num" style={{ display: "block" }}>
                    {r.bytes} B
                  </span>
                </>
              ),
            }))}
          />
        </>
      )}

      <p className="privacy-line mt-24">
        <LockIcon width={18} height={18} aria-hidden="true" />
        {t("privacy.onDevice")}
      </p>
    </>
  );
}
