"use client";

/* ============================================================================
   The parts that only Home uses.

   Each one answers a question a person arriving at Sajag actually has:

     QuickEntryCard   "where do I put the message?"
     PatternRow       "what does a scam even look like?"
     LastCheckRow     "what did I look at last time?"
     PrivacyPanel     "what have you taken from me?"

   None of them judges anything. The engine does that, on /check.
   ========================================================================== */

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowIcon,
  CameraIcon,
  ChevronRightIcon,
  LinkIcon,
  LockIcon,
  MicIcon,
  PasteIcon,
  RupeeIcon,
  WarningIcon,
} from "@/components/icons";
import { ButtonLink, InlineLink, Panel } from "@/components/ui";
import { useSettings } from "@/components/use-settings";
import type { HistoryEntry } from "@/lib/history";

/* ================================================== quick entry card ===== */

export function QuickEntryCard({ quiet }: { quiet?: boolean }) {
  const { t } = useSettings();
  const router = useRouter();

  /* Reading the clipboard needs a user gesture and can be refused outright.
     If it is refused we do not apologise or explain, we just open the
     composer, where the person can long-press and paste the way they always
     have. A denied permission should cost one tap, not a dialogue. */
  async function pasteAndGo() {
    try {
      const clip = (await navigator.clipboard.readText()).trim();
      if (clip) {
        router.push(`/check?text=${encodeURIComponent(clip.slice(0, 4000))}`);
        return;
      }
    } catch {
      /* no clipboard permission, or an empty clipboard */
    }
    router.push("/check");
  }

  return (
    <div>
      <div className="quick-card">
        {/* The ruled sheet is a link, not a textarea. One place in the app
            holds a half-typed message, and it is the composer on /check. */}
        <Link href="/check" className="quick-surface">
          {t("quick.placeholder")}
        </Link>
        <button type="button" className="quick-paste" onClick={pasteAndGo}>
          <PasteIcon width={20} height={20} aria-hidden="true" />
          {t("quick.paste")}
        </button>
      </div>

      {/* The one filled button on the page, unless an open case has taken
          that job, in which case this steps down to a secondary. */}
      <div className="mt-12">
        <ButtonLink
          href="/check"
          variant={quiet ? "secondary" : "primary"}
          size="lg"
          full
        >
          {t("quick.check")}
          <ArrowIcon className="btn-arrow" width={22} height={22} aria-hidden="true" />
        </ButtonLink>
      </div>

      {/* Two ways in for the people who cannot type: a widow with the
          message read out to her by a neighbour, and a man holding a
          photograph of his own screen. */}
      <div className="mt-12 grid-2">
        <ButtonLink href="/check?mode=voice" variant="secondary" size="lg" full>
          <MicIcon width={22} height={22} aria-hidden="true" />
          {t("quick.speak")}
        </ButtonLink>
        <ButtonLink href="/check?mode=photo" variant="secondary" size="lg" full>
          <CameraIcon width={22} height={22} aria-hidden="true" />
          {t("quick.photo")}
        </ButtonLink>
      </div>
    </div>
  );
}

/* ======================================================= pattern row ===== */

/* The four shapes almost every investment scam takes. They are rows on Home
   and real golden messages in the composer, so "see what it looks like" ends
   with the person running the same check they would run on their own
   message, not reading a leaflet about fraud. */
export const PATTERNS = [
  { sample: "G1", key: "home.trap1", Icon: LinkIcon },
  { sample: "G2", key: "home.trap2", Icon: LockIcon },
  { sample: "G3", key: "home.trap3", Icon: RupeeIcon },
  { sample: "G4", key: "home.trap4", Icon: WarningIcon },
] as const;

export function PatternRow({
  sample,
  title,
  icon,
}: {
  sample: string;
  title: string;
  icon: React.ReactNode;
}) {
  const { t } = useSettings();
  return (
    <Link href={`/check?sample=${sample}`} className="pattern-row">
      <span className="pattern-plate" aria-hidden="true">
        {icon}
      </span>
      <span className="pattern-text">
        <span className="t-tile" style={{ display: "block" }}>
          {title}
        </span>
        <span className="tile-desc">{t("home.trapSub")}</span>
      </span>
      <ChevronRightIcon className="ink-2 entry-chevron" aria-hidden="true" />
    </Link>
  );
}

/* ===================================================== the last check ==== */

const STATE_CLASS: Record<string, string> = {
  HIGH_RISK: "stamp-HIGH",
  MULTIPLE_RED_FLAGS: "stamp-MULTIPLE",
  SOME_CONCERNS: "stamp-SOME",
  NO_STRONG_FLAGS: "stamp-NONE",
  NOT_ENOUGH_TO_GO_ON: "stamp-NOT_ENOUGH",
};

export function LastCheckRow({ entry }: { entry: HistoryEntry }) {
  const { settings, t } = useSettings();
  const when = new Date(entry.at).toLocaleDateString(
    settings.lang === "en" ? "en-IN" : "hi-IN",
    { day: "numeric", month: "short" },
  );
  return (
    <Link href="/history" className="last-check">
      <span
        className={`last-check-plate ${STATE_CLASS[entry.state] ?? "stamp-NONE"}`}
        aria-hidden="true"
      >
        {t(`state.${entry.state}.stamp`)}
      </span>
      <span className="last-check-text">
        <span className="t-body last-check-msg message-text">
          {entry.text.slice(0, 60)}
        </span>
        <span className="t-small ink-2 num">{when}</span>
      </span>
      <ChevronRightIcon className="ink-2 entry-chevron" aria-hidden="true" />
    </Link>
  );
}

/* ===================================================== privacy panel ===== */

/* A number, not a promise. It is almost always zero, and on the days it is
   not, the person can see exactly what went and why. */
export function PrivacyPanel({ bytes }: { bytes: number }) {
  const { t } = useSettings();
  return (
    <Panel className="privacy-panel">
      <p className="t-caption ink-2">{t("home.privacyLabel")}</p>
      <p className="t-serif num mt-8" style={{ fontSize: "var(--t-h2)" }}>
        {bytes} B
      </p>
      <p className="mt-8 t-small">
        <InlineLink href="/settings/ledger">{t("home.privacySee")}</InlineLink>
      </p>
      <p className="t-body mt-12">{t("home.privacyLine")}</p>
    </Panel>
  );
}
