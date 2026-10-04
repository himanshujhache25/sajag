"use client";

/* ============================================================================
   Navigation furniture: the header, the double rule, the bottom tab bar, the
   inner-page app bar, the sticky action bar, the footer and the desktop brand
   rail. Section 4, 5.1 and 6 of docs/UI_SPEC.md.

   The tab bar lives inside the page column rather than across the viewport,
   so on a tablet it lines up with the content instead of floating in the
   desk space around it.
   ========================================================================== */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import {
  BackIcon,
  ChevronDownIcon,
  GlobeIcon,
  HomeIcon,
  LifebuoyIcon,
  MinusIcon,
  MoreIcon,
  PauseIcon,
  PlusIcon,
  SearchDocIcon,
  SpeakerIcon,
  TextSizeIcon,
} from "@/components/icons";
import { Button, InlineLink } from "@/components/ui";
import { Sheet } from "@/components/ui/overlay";
import { useSettings } from "@/components/use-settings";
import { needsReview } from "@/lib/i18n";
import { LANG_INFO, LANGS, isLang } from "@/lib/i18n/langs";

/* ====================================================== brand mark ======= */

export function Wordmark({ large }: { large?: boolean }) {
  const { t } = useSettings();
  return (
    <span
      className="wordmark"
      style={large ? { fontSize: "2.4444rem" } : undefined}
    >
      {t("app.name")}
      <span className="wordmark-dot" aria-hidden="true" />
    </span>
  );
}

/* ========================================================== header ======= */

export function Header({ onSnack }: { onSnack: (m: string) => void }) {
  const { settings, set, t } = useSettings();
  const [langOpen, setLangOpen] = useState(false);

  /* 100 → 125 → 150, with a stop at each end. Two buttons rather than one
     cycling button, so growing the text is never a trap you can only escape
     by going all the way round again. */
  const STOPS = [1, 1.25, 1.5] as const;
  const at = STOPS.indexOf(settings.textScale as (typeof STOPS)[number]);
  const here = at === -1 ? 0 : at;

  function step(by: 1 | -1) {
    const next = STOPS[Math.min(STOPS.length - 1, Math.max(0, here + by))];
    if (next === settings.textScale) return;
    set({ textScale: next });
    onSnack(`${t("ui.textSize")}: ${Math.round(next * 100)}%`);
  }

  const sizeLabel = (to: number) =>
    `${t("ui.textSize")} ${Math.round(to * 100)}%`;

  return (
    <>
      <header className="app-header">
        <Link href="/" aria-label={t("app.name")} className="header-brand">
          <Wordmark />
          <span className="tagline" style={{ display: "block" }}>
            {t("app.tagline")}
          </span>
        </Link>

        <div className="header-tools">
          <button
            type="button"
            className="lang-chip"
            onClick={() => setLangOpen(true)}
            aria-haspopup="dialog"
          >
            <GlobeIcon width={20} height={20} aria-hidden="true" />
            <span className="lang-name" lang={settings.lang} dir={LANG_INFO[settings.lang].dir}>
              {LANG_INFO[settings.lang].native}
            </span>
            <ChevronDownIcon width={16} height={16} aria-hidden="true" />
          </button>

          <span className="size-group">
            <button
              type="button"
              className="icon-btn size-btn"
              onClick={() => step(-1)}
              disabled={here === 0}
              aria-label={sizeLabel(STOPS[Math.max(0, here - 1)])}
              title={sizeLabel(STOPS[Math.max(0, here - 1)])}
            >
              <MinusIcon width={20} height={20} aria-hidden="true" />
            </button>
            <span className="size-now" aria-hidden="true">
              <TextSizeIcon width={20} height={20} />
            </span>
            <button
              type="button"
              className="icon-btn size-btn"
              onClick={() => step(1)}
              disabled={here === STOPS.length - 1}
              aria-label={sizeLabel(STOPS[Math.min(STOPS.length - 1, here + 1)])}
              title={sizeLabel(STOPS[Math.min(STOPS.length - 1, here + 1)])}
            >
              <PlusIcon width={20} height={20} aria-hidden="true" />
            </button>
          </span>
        </div>
      </header>

      <div className="page-pad">
        <div className="double-rule" aria-hidden="true" />
      </div>

      <LanguageSheet open={langOpen} onClose={() => setLangOpen(false)} />
    </>
  );
}

export function LanguageSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { settings, set, t } = useSettings();
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={t("start.langTitle")}
      closeLabel={t("common.close")}
    >
      <ul className="stack-12" role="radiogroup" aria-label={t("nav.language")}>
        {LANGS.map((l) => (
          <li key={l}>
            <button
              type="button"
              role="radio"
              aria-checked={settings.lang === l}
              onClick={() => {
                if (isLang(l)) set({ lang: l });
                onClose();
              }}
              className={`option-row ${settings.lang === l ? "option-row-on" : ""}`}
            >
              <span className="tile-text">
                {/* The name in its own script and its own direction, with the
                    Latin name under it. Someone setting up a parent's phone
                    can find Malayalam without reading Malayalam, and the
                    parent recognises their language at a glance. */}
                <span
                  className="lang-name"
                  lang={l}
                  dir={LANG_INFO[l].dir}
                  style={{ display: "block", fontWeight: 600 }}
                >
                  {LANG_INFO[l].native}
                </span>
                <span className="tile-desc lang-name-en" lang="en" dir="ltr">
                  {LANG_INFO[l].english}
                  {/* Honest about the ten machine-assisted packs rather than
                      quietly shipping them as finished work. */}
                  {needsReview(l) ? ` ${t("common.beta")}` : ""}
                </span>
              </span>
              <span
                className={`radio-mark ${settings.lang === l ? "mark-on" : ""}`}
                aria-hidden="true"
              >
                {settings.lang === l ? <span className="radio-dot" /> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Sheet>
  );
}

/* ========================================================= app bar ======= */

/* Inner pages. The page title is the h1 in the content, not in this bar, so
   it can be two lines long in Tamil without squeezing anything. */
export function AppBar({
  onListen,
  right,
}: {
  onListen?: () => void;
  right?: ReactNode;
}) {
  const { t } = useSettings();
  const router = useRouter();
  return (
    <div className="app-bar">
      <button
        type="button"
        className="back-btn"
        onClick={() => router.back()}
        aria-label={t("ui.back")}
      >
        <BackIcon width={22} height={22} aria-hidden="true" />
        {t("ui.back")}
      </button>
      {right ??
        (onListen ? (
          <Button variant="secondary" size="md" onClick={onListen}>
            <SpeakerIcon width={20} height={20} aria-hidden="true" />
            {t("common.listen")}
          </Button>
        ) : null)}
    </div>
  );
}

/* ========================================================= tab bar ======= */

const TABS = [
  { href: "/", key: "tab.home", Icon: HomeIcon, match: ["/"] },
  {
    href: "/check",
    key: "tab.check",
    Icon: SearchDocIcon,
    match: ["/check"],
  },
  /* "Money gone?" is the page's own title, but five tabs have to fit inside
     320px in twelve languages, so the tab says "Help". */
  { href: "/madad", key: "tab.madad", Icon: LifebuoyIcon, match: ["/madad"] },
  { href: "/pause", key: "tab.pause", Icon: PauseIcon, match: ["/pause"] },
  {
    href: "/more",
    key: "tab.more",
    Icon: MoreIcon,
    match: [
      "/more",
      "/learn",
      "/family",
      "/history",
      "/settings",
      "/simulate",
      "/about",
      "/pulse",
    ],
  },
];

export function TabBar() {
  const { t } = useSettings();
  const path = usePathname() ?? "/";
  return (
    <nav className="tab-bar" aria-label={t("nav.home")}>
      {TABS.map(({ href, key, Icon, match }) => {
        const on = match.some((m) =>
          m === "/" ? path === "/" : path.startsWith(m),
        );
        return (
          <Link
            key={href}
            href={href}
            className={`tab ${on ? "tab-on" : ""}`}
            aria-current={on ? "page" : undefined}
          >
            <span className="tab-plate">
              <Icon width={26} height={26} aria-hidden="true" />
            </span>
            <span className="tab-label">{t(key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/* Wizards, the pact and the journal form show this instead of the tab bar:
   on those screens there is exactly one way forward. */
export function StickyActionBar({ children }: { children: ReactNode }) {
  return <div className="sticky-bar stack-12">{children}</div>;
}

/* ========================================================== footer ======= */

export function Footer() {
  const { t } = useSettings();
  return (
    <footer className="app-footer">
      <p>{t("app.disclaimer")}</p>
      <p className="footer-links">
        <InlineLink href="/settings/ledger">{t("settings.ledger")}</InlineLink>
        <InlineLink href="/about">{t("nav.about")}</InlineLink>
      </p>
    </footer>
  );
}

/* ===================================================== desktop rail ====== */

/* 1024px and up. A lone 560px column in an empty window looks unfinished, so
   the brand, the three promises and the privacy total move out to the left
   and the tab bar becomes a vertical nav. */
export function BrandRail({ bytes }: { bytes: number }) {
  const { t } = useSettings();
  const path = usePathname() ?? "/";
  return (
    <aside className="rail" aria-label={t("app.name")}>
      <Wordmark large />
      <p className="t-lead ink-2 mt-8">{t("app.tagline")}</p>

      <div className="mt-32">
        {[t("start.promise1"), t("start.promise2"), t("start.promise3")].map(
          (line, i) => (
            <div className="entry" key={line}>
              <span className="entry-n num" aria-hidden="true">
                {i + 1}
              </span>
              <p className="t-body">{line}</p>
            </div>
          ),
        )}
      </div>

      <div className="panel mt-32">
        <p className="t-caption ink-2">{t("privacy.sessionTotal")}</p>
        <p className="t-serif num mt-8" style={{ fontSize: "var(--t-h1)" }}>
          {bytes} B
        </p>
        <p className="mt-8 t-small">
          <InlineLink href="/settings/ledger">{t("privacy.see")}</InlineLink>
        </p>
      </div>

      <nav className="mt-32" aria-label={t("nav.home")}>
        {TABS.map(({ href, key, Icon, match }) => {
          const on = match.some((m) =>
            m === "/" ? path === "/" : path.startsWith(m),
          );
          return (
            <Link
              key={href}
              href={href}
              className={`rail-nav-item ${on ? "rail-nav-item-on" : ""}`}
              aria-current={on ? "page" : undefined}
            >
              <Icon width={24} height={24} aria-hidden="true" />
              {t(key)}
            </Link>
          );
        })}
      </nav>

      <p className="t-caption ink-2 mt-32">{t("app.disclaimer")}</p>
    </aside>
  );
}
