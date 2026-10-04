import type { SVGProps } from "react";

/* One 24px grid, 2px stroke, round caps and joins, currentColor only. No icon
   library: every glyph here is drawn for this app so the line weight matches
   the 1.5px borders and the hand-ruled feel. Section 3.4 of docs/UI_SPEC.md.

   Icons are always paired with a word. The only exceptions are back and
   close, which carry an aria-label and a 52px target. */

type P = SVGProps<SVGSVGElement>;

function Svg({ children, ...rest }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* A house: the one glyph everyone already reads as "back to the start". The
   roof is a plain chevron and the door is a notch, so at 24px it stays a
   house rather than a smudge. */
export const HomeIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 10.5 12 3.5l8.5 7" />
    <path d="M5.5 10v9.5a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V10" />
    <path d="M10 20v-4.5h4V20" />
  </Svg>
);

/* A message with a magnifier over its corner: "look closely at this text".
   Kept for the Check tile; the tab bar uses SearchDocIcon, which holds
   together better at 24px. */
export const CheckMessageIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v8a1.5 1.5 0 0 1-1.5 1.5H8l-4 4v-4" />
    <circle cx="16.5" cy="16.5" r="3.5" />
    <path d="M19.2 19.2 21.5 21.5" />
  </Svg>
);

/* A sheet of paper with two lines of writing and a magnifier over its lower
   corner. The two shapes are kept a clear 2px apart at their stroke centres
   so they never merge into one blob on a cheap screen. */
export const SearchDocIcon = (p: P) => (
  <Svg {...p}>
    <path d="M17 12.5V4.5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h4" />
    <path d="M9 8h5M9 11.5h5" />
    <circle cx="16.5" cy="16.5" r="3.5" />
    <path d="M19.2 19.2 21.5 21.5" />
  </Svg>
);

/* A line that falls and then rises, with a dot at each turn: "run the
   numbers". Simulate used the ledger glyph before, which said "records". */
export const ChartIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 4v15.5a.5.5 0 0 0 .5.5h16.5" />
    <path d="m7 15 4-5.5 3 3L20 6" />
    <circle cx="11" cy="9.5" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="14" cy="12.5" r="1.3" fill="currentColor" stroke="none" />
  </Svg>
);

export const LifebuoyIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="m5.6 5.6 3.2 3.2M18.4 5.6l-3.2 3.2M18.4 18.4l-3.2-3.2M5.6 18.4l3.2-3.2" />
  </Svg>
);

export const PauseIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 9v6M14 9v6" />
  </Svg>
);

export const MicIcon = (p: P) => (
  <Svg {...p}>
    <rect x="8" y="2" width="8" height="12" rx="4" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3M8.5 21h7" />
  </Svg>
);

export const CameraIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.2-2h8.2l1.2 2h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
    <circle cx="12" cy="13" r="3.5" />
  </Svg>
);

export const PasteIcon = (p: P) => (
  <Svg {...p}>
    <path d="M9 4H6.5A1.5 1.5 0 0 0 5 5.5v14A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-14A1.5 1.5 0 0 0 17.5 4H15" />
    <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
    <path d="M9 12h6M9 16h4" />
  </Svg>
);

export const ShareIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="m8.3 10.8 7.4-4.3M8.3 13.2l7.4 4.3" />
  </Svg>
);

export const SpeakerIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" />
    <path d="M16 9.5a4 4 0 0 1 0 5M18.5 7a7.5 7.5 0 0 1 0 10" />
  </Svg>
);

export const PhoneIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 4h4l1.5 4.5-2.3 1.6a12 12 0 0 0 6.2 6.2l1.6-2.3L20 15.5v4a1.5 1.5 0 0 1-1.7 1.5A16.5 16.5 0 0 1 3 5.7 1.5 1.5 0 0 1 4.5 4" />
  </Svg>
);

export const LockIcon = (p: P) => (
  <Svg {...p}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="1.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const LinkIcon = (p: P) => (
  <Svg {...p}>
    <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.9 6.4" />
    <path d="M13.5 10.5a4 4 0 0 0-5.7 0L5 13.3a4 4 0 0 0 5.7 5.7l1.4-1.4" />
  </Svg>
);

export const WarningIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5 22 20H2z" />
    <path d="M12 10v4.5" />
    <circle cx="12" cy="17.3" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

export const TickIcon = (p: P) => (
  <Svg {...p}>
    <path d="m4 12.5 5.5 5.5L20 6.5" />
  </Svg>
);

export const CrossIcon = (p: P) => (
  <Svg {...p}>
    <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" />
  </Svg>
);

export const ClockIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.2 2" />
  </Svg>
);

export const HistoryIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3 9" />
    <path d="M3 4.5V9h4.5" />
    <path d="M12 7.5v5l3 1.8" />
  </Svg>
);

export const FamilyIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="8" cy="7" r="3" />
    <circle cx="17" cy="8.5" r="2.4" />
    <path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h2a4.5 4.5 0 0 1 4.5 4.5V20" />
    <path d="M15.5 20v-1.2a4 4 0 0 1 2.3-3.6" />
  </Svg>
);

export const BookIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z" />
    <path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19v-3" />
    <path d="M8 7.5h7" />
  </Svg>
);

export const PenIcon = (p: P) => (
  <Svg {...p}>
    <path d="M16.5 3.5 20.5 7.5 8 20H4v-4z" />
    <path d="m14 6 4 4" />
  </Svg>
);

export const LedgerIcon = (p: P) => (
  <Svg {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M8 3v18" />
    <path d="M11 8h6M11 12h6M11 16h4" />
  </Svg>
);

export const RupeeIcon = (p: P) => (
  <Svg {...p}>
    <path d="M7 4h10M7 8.5h10M16 4c0 4-3 4.5-6 4.5h-.5L17 20" />
    <path d="M9.5 8.5H7" />
  </Svg>
);

export const PrinterIcon = (p: P) => (
  <Svg {...p}>
    <path d="M7 9V3h10v6" />
    <path d="M5 9h14a2 2 0 0 1 2 2v5h-4" />
    <path d="M7 16H3v-5a2 2 0 0 1 2-2" />
    <rect x="7" y="13" width="10" height="8" rx="1" />
  </Svg>
);

export const DownloadIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3v12M7 10.5l5 5 5-5" />
    <path d="M4 19.5h16" />
  </Svg>
);

export const BackIcon = (p: P) => (
  <Svg {...p}>
    <path d="M20 12H4.5M10.5 5.5 4 12l6.5 6.5" />
  </Svg>
);

export const ArrowIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 12h15.5M13.5 5.5 20 12l-6.5 6.5" />
  </Svg>
);

export const ChevronRightIcon = (p: P) => (
  <Svg {...p}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const ChevronDownIcon = (p: P) => (
  <Svg {...p}>
    <path d="m5 9 7 7 7-7" />
  </Svg>
);

export const GlobeIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
    <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18" />
  </Svg>
);

/* The glyph "अ" with a plus: text size, without needing the word "font". */
export const TextSizeIcon = (p: P) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <text
      x="2"
      y="18"
      fontSize="16"
      fill="currentColor"
      stroke="none"
      fontFamily="var(--ui-serif)"
    >
      अ
    </text>
    <path d="M19 4v6M16 7h6" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

/* Three sliders: settings without the clockwork cog cliché. */
export const SettingsIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
    <circle cx="8" cy="7" r="2" fill="var(--panel)" />
    <circle cx="16" cy="12" r="2" fill="var(--panel)" />
    <circle cx="10" cy="17" r="2" fill="var(--panel)" />
  </Svg>
);

export const MoreIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </Svg>
);

export const ShieldIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3 20 6v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
  </Svg>
);

/* A bulb crossed out: "this app does not give you ideas about what to buy". */
export const NoAdviceIcon = (p: P) => (
  <Svg {...p}>
    <path d="M9 17h6M10 20h4" />
    <path d="M7.5 11a4.5 4.5 0 1 1 9 0c0 2-1.5 3-1.5 4.5h-6C9 14 7.5 13 7.5 11" />
    <path d="M4 4 20 20" />
  </Svg>
);

export const NoAccountIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
    <path d="M4 4 20 20" />
  </Svg>
);

export const SearchIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Svg>
);

export const PlusIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const MinusIcon = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);

export const CopyIcon = PasteIcon;
