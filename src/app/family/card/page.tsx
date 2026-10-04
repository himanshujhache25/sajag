"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Panel, SectionLabel } from "@/components/ui";
import { useSettings } from "@/components/use-settings";
import { BackIcon, DownloadIcon, ShareIcon } from "@/components/icons";
import {
  CARD_H,
  CARD_W,
  canShareCard,
  cardToBlob,
  downloadCard,
  drawCard,
} from "@/lib/card";
import { appendLedger } from "@/lib/storage";

/* The safety card. Section 8.8 of docs/SPEC.md.

   The whole thing is drawn on the phone. Nothing is uploaded, no image
   service is called, and the card can be made with the network off. */
export default function CardPage() {
  const { settings, t } = useSettings();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [note, setNote] = useState<string | null>(null);

  const text = useCallback(
    () => ({
      appName: t("app.name"),
      heading: t("card.heading"),
      lines: [
        t("card.l1"),
        t("card.l2"),
        t("card.l3"),
        t("card.l4"),
        t("card.l5"),
      ],
      footer: [t("card.f1"), t("card.f2")],
      disclaimer: t("card.disclaimer"),
    }),
    [t],
  );

  /* Redraw on language, theme and contrast, because the card picks its
     colours off the live page. */
  useEffect(() => {
    if (canvas.current) drawCard(canvas.current, text());
  }, [text, settings.lang, settings.theme, settings.contrast]);

  const filename = `sajag-${t("card.title").replace(/\s+/g, "-")}.png`;

  async function save() {
    if (!canvas.current) return;
    const blob = await cardToBlob(canvas.current);
    if (!blob) return;
    downloadCard(blob, filename);
    setNote(t("card.saved"));
  }

  async function share() {
    if (!canvas.current) return;
    const blob = await cardToBlob(canvas.current);
    if (!blob) return;
    const file = new File([blob], filename, { type: "image/png" });

    if (!canShareCard(file)) {
      downloadCard(blob, filename);
      setNote(t("card.shareFailed"));
      return;
    }
    try {
      await navigator.share({ files: [file], title: t("card.heading") });
      /* The person chose to send it, so it goes in the ledger like any
         other thing that left the phone. */
      await appendLedger({
        at: Date.now(),
        what: "ledger.what.share",
        fields: ["card.png"],
        bytes: blob.size,
        masked: [],
      });
    } catch {
      /* A cancelled share sheet is not an error worth shouting about. */
    }
  }

  return (
    <>
      <Link href="/family" className="back-link">
        <BackIcon width={18} height={18} aria-hidden="true" />
        {t("familyPage.title")}
      </Link>

      <h1 className="mt-16">{t("card.title")}</h1>
      <p className="t-lead ink-2 mt-8">{t("card.sub")}</p>
      <p className="t-caption ink-2 mt-8">{t("card.langNote")}</p>

      <canvas
        ref={canvas}
        width={CARD_W}
        height={CARD_H}
        aria-label={t("card.alt")}
        role="img"
        className="card-canvas"
      />

      <SectionLabel>{t("card.heading")}</SectionLabel>
      <ul className="rule-list">
        {["l1", "l2", "l3", "l4", "l5"].map((k) => (
          <li key={k}>{t(`card.${k}`)}</li>
        ))}
      </ul>
      <p className="t-tile mt-16">
        {t("card.f1")} {t("card.f2")}
      </p>

      <div className="stack-12 mt-24">
        <Button onClick={share} full>
          <ShareIcon width={20} height={20} aria-hidden="true" />
          {t("card.share")}
        </Button>
        <Button variant="secondary" onClick={save} full>
          <DownloadIcon width={20} height={20} aria-hidden="true" />
          {t("card.save")}
        </Button>
      </div>

      {note ? (
        <p aria-live="polite" className="mt-16">
          {note}
        </p>
      ) : null}

      <Panel sunken className="mt-24">
        <p className="t-caption ink-2">{t("privacy.onDevice")}</p>
      </Panel>
    </>
  );
}
