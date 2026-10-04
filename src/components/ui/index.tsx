"use client";

/* ============================================================================
   Sajag primitives. Every visual rule lives in src/styles/components.css; this
   file only decides semantics, structure and state. Nothing here writes a
   colour, a size or a spacing value, which is what keeps the design system
   honest across nineteen screens and seven languages.
   Section 4 of docs/UI_SPEC.md.
   ========================================================================== */

import Link from "next/link";
import {
  useId,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TickIcon,
  WarningIcon,
} from "@/components/icons";

type Tone = "neutral" | "danger" | "caution" | "ok" | "action";

const toneClass: Record<Tone, string> = {
  neutral: "",
  danger: "tag-danger",
  caution: "tag-caution",
  ok: "tag-ok",
  action: "tag-action",
};

/* ========================================================== button ======= */

export type Variant = "primary" | "secondary" | "emergency" | "text";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  emergency: "btn btn-emergency",
  text: "btn btn-text",
};

function btnClass(
  variant: Variant,
  size: "lg" | "md",
  full?: boolean,
  extra = "",
) {
  return [
    variantClass[variant],
    size === "md" && variant !== "emergency" ? "btn-md" : "",
    full ? "btn-full" : "",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  size = "lg",
  full,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "lg" | "md";
  full?: boolean;
}) {
  return (
    <button
      type="button"
      className={btnClass(variant, size, full, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  full,
  external,
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: "lg" | "md";
  full?: boolean;
  external?: boolean;
}) {
  const cls = btnClass(variant, size, full, className);
  /* `tel:` and `https:` targets must not go through the router. */
  if (external || /^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={cls} rel="noreferrer noopener" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/* Icon-only, so the label is mandatory rather than optional. */
export function IconButton({
  label,
  round,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  round?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`icon-btn ${round ? "icon-btn-round" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ============================================================ link ======= */

/* The only element in the app allowed to be underlined. */
export function InlineLink({
  href,
  external,
  children,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
}) {
  const cls = `inline-link ${className}`;
  if (external || /^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        rel="noreferrer noopener"
        target={external ? "_blank" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/* =========================================================== tiles ======= */

export function ActionTile({
  href,
  onClick,
  title,
  desc,
  icon,
  tone = "neutral",
  tag,
}: {
  href?: string;
  onClick?: () => void;
  title: string;
  desc?: string;
  icon: ReactNode;
  tone?: "neutral" | "danger" | "caution";
  tag?: string;
}) {
  const inner = (
    <>
      {tone === "neutral" ? null : (
        <span className={`tile-bar tile-bar-${tone}`} aria-hidden="true" />
      )}
      <span
        className={`tile-plate ${tone === "danger" ? "plate-danger" : ""} ${
          tone === "caution" ? "plate-caution" : ""
        }`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="tile-text">
        <span className="t-tile" style={{ display: "block" }}>
          {title}
        </span>
        {desc ? <span className="tile-desc">{desc}</span> : null}
      </span>
      {tag ? <Tag tone={tone === "neutral" ? "action" : tone}>{tag}</Tag> : null}
      <ChevronRightIcon className="ink-2" aria-hidden="true" />
    </>
  );
  if (href) {
    return (
      <Link href={href} className="tile">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className="tile" onClick={onClick}>
      {inner}
    </button>
  );
}

export function QuickTile({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link href={href} className="quick-tile">
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

/* A label with a rule running out of it, like a heading in a ruled book. */
export function SectionLabel({
  children,
  id,
}: {
  children: ReactNode;
  /* Lets a <section> point at its own heading with aria-labelledby, so a
     screen reader announces "Anything else, region" instead of "region". */
  id?: string;
}) {
  return (
    <h2 className="section-label" id={id}>
      {children}
    </h2>
  );
}

/* ================================================== panels and notes ===== */

export function Panel({
  children,
  sunken,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { sunken?: boolean }) {
  return (
    <div
      className={`panel ${sunken ? "panel-sunken" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* A note pencilled in the margin: never an instruction, always an aside. */
export function Note({
  title,
  children,
  plain,
}: {
  title?: string;
  children: ReactNode;
  plain?: boolean;
}) {
  return (
    <div className="note">
      {title ? <p className="note-title">{title}</p> : null}
      <div className={plain ? "t-body" : "note-body"}>{children}</div>
    </div>
  );
}

export function Banner({
  children,
  icon,
  role = "status",
}: {
  children: ReactNode;
  icon?: ReactNode;
  role?: "status" | "alert";
}) {
  return (
    <p className="banner" role={role}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </p>
  );
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return <span className={`tag ${toneClass[tone]}`}>{children}</span>;
}

export function EmptyState({
  word,
  line,
  action,
}: {
  word: string;
  line: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      {/* 0.7, not 0.4. The ghosted stamp is meant to look like an unused
          rubber stamp, but at 0.4 the ink blended into the paper at about
          1.8:1, against the 3:1 that large text owes. 0.7 computes to
          roughly 3.4:1 and still reads as faded. The contrast token test
          could not catch this: the token is fine, and the opacity was
          what broke it. */}
      <span className="stamp stamp-NONE" style={{ opacity: 0.7 }}>
        <span className="stamp-word">{word}</span>
      </span>
      <p className="t-lead mt-16">{line}</p>
      {action ? <div className="mt-16">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  what,
  safe,
  action,
}: {
  what: string;
  safe: string;
  action?: ReactNode;
}) {
  return (
    <div className="error-state" role="alert">
      <p className="t-tile" style={{ display: "flex", gap: 8 }}>
        <WarningIcon aria-hidden="true" />
        {what}
      </p>
      <p className="t-body mt-8">{safe}</p>
      {action ? <div className="mt-16">{action}</div> : null}
    </div>
  );
}

/* =========================================================== stamp ======= */

export type Verdict = "HIGH" | "MULTIPLE" | "SOME" | "NONE" | "NOT_ENOUGH";

/* A rubber stamp on a ledger page: the one piece of decoration that carries
   meaning. It lands once, then stays still. */
export function Stamp({
  verdict,
  word,
  sub,
  announce,
}: {
  verdict: Verdict;
  word: string;
  sub?: string;
  announce?: string;
}) {
  return (
    <>
      <span
        className={`stamp stamp-${verdict} stamp-thunk`}
        aria-hidden="true"
      >
        <span className="stamp-word">{word}</span>
        {sub ? (
          <span className="stamp-sub" lang="en">
            {sub}
          </span>
        ) : null}
      </span>
      <span className="sr-only" role="status">
        {announce ?? word}
      </span>
    </>
  );
}

/* =========================================================== ruler ======= */

const segColour: Record<number, string> = {
  0: "var(--ink-2)",
  1: "var(--caution-fill)",
  2: "var(--danger)",
  3: "var(--danger)",
};

/* Four segments, a pointer and four words. Colour is never the only cue. */
export function Ruler({
  level,
  labels,
  caption,
}: {
  level: 0 | 1 | 2 | 3;
  labels: [string, string, string, string];
  caption?: string;
}) {
  return (
    <div>
      <div
        className="ruler"
        role="img"
        aria-label={`${labels[level]}${caption ? `. ${caption}` : ""}`}
      >
        {labels.map((l, i) => (
          <span
            key={l}
            className={`ruler-seg ${i <= level ? "ruler-seg-on" : ""}`}
            style={
              i <= level
                ? ({ ["--seg"]: segColour[level] } as React.CSSProperties)
                : undefined
            }
          />
        ))}
      </div>
      <div className="ruler-labels" aria-hidden="true">
        {labels.map((l, i) => (
          <span
            key={l}
            className={`ruler-label ${i === level ? "ruler-label-on" : ""}`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProgressRuler({
  value,
  max = 100,
  label,
  tall,
}: {
  value: number;
  max?: number;
  label?: string;
  tall?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  /* An unlabelled progressbar announces "42 percent" and nothing else, which
     is noise rather than information — so when there is no label this is a
     decorative bar and is hidden from the screen reader instead. Every
     caller that hides it this way shows the same quantity in words nearby;
     /check/result does exactly that with its own `.progress` markup.
     Without this, axe reports aria-progressbar-name on five routes. */
  const bar = (
    <div
      className={`progress ${tall ? "progress-tall" : ""} ${label ? "mt-8" : ""}`}
      {...(label
        ? {
            role: "progressbar",
            "aria-valuenow": Math.round(pct),
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-label": label,
          }
        : { "aria-hidden": true })}
    >
      <span className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );

  return (
    <div>
      {label ? <p className="t-caption ink-2">{label}</p> : null}
      {bar}
    </div>
  );
}

/* ====================================================== ledger entry ===== */

export function Entry({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="entry">
      <span className="entry-n num" aria-hidden="true">
        {n}
      </span>
      <div className="tile-text">
        <p className="t-tile">{title}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </div>
  );
}

export function EvidenceQuote({
  children,
  tone = "danger",
}: {
  children: ReactNode;
  tone?: "danger" | "caution" | "action";
}) {
  return (
    <blockquote
      className="quote"
      style={{ ["--qc"]: `var(--${tone})` } as React.CSSProperties}
    >
      {children}
    </blockquote>
  );
}

/* ====================================================== disclosure ======= */

export function Disclosure({
  label,
  children,
  defaultOpen,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        className="disclosure"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDownIcon className="disclosure-chev" />
      </button>
      <div id={id} hidden={!open}>
        {open ? children : null}
      </div>
    </div>
  );
}

/* =========================================================== forms ======= */

export function TextField({
  label,
  help,
  error,
  className = "",
  id: fixedId,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  help?: string;
  error?: string;
}) {
  const auto = useId();
  const id = fixedId ?? auto;
  const helpId = `${id}-help`;
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`field ${error ? "field-invalid" : ""} ${className}`}
        aria-describedby={help || error ? helpId : undefined}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error ? (
        <p className="field-error" id={helpId}>
          <WarningIcon width={20} height={20} />
          {error}
        </p>
      ) : help ? (
        <p className="field-help" id={helpId}>
          {help}
        </p>
      ) : null}
    </div>
  );
}

export function TextArea({
  label,
  help,
  className = "",
  id: fixedId,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  help?: string;
}) {
  const auto = useId();
  const id = fixedId ?? auto;
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <textarea id={id} className={`field ${className}`} {...rest} />
      {help ? <p className="field-help">{help}</p> : null}
    </div>
  );
}

/* Indian grouping as you type, because ₹1,20,000 and ₹120,000 are read
   differently and the second one looks foreign on a complaint form. */
export function MoneyField({
  label,
  value,
  onValueChange,
  help,
  id: fixedId,
}: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  help?: string;
  id?: string;
}) {
  const auto = useId();
  const id = fixedId ?? auto;
  const digits = value.replace(/\D/g, "");
  const shown = digits ? new Intl.NumberFormat("en-IN").format(+digits) : "";
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="money-row">
        <span className="money-prefix" aria-hidden="true">
          ₹
        </span>
        <input
          id={id}
          className="money-input"
          inputMode="numeric"
          autoComplete="off"
          value={shown}
          onChange={(e) => onValueChange(e.target.value.replace(/\D/g, ""))}
        />
      </div>
      {help ? <p className="field-help">{help}</p> : null}
    </div>
  );
}

/* A blank on a printed form. Used in the 1930 script and the pact so the
   sentence stays a sentence. */
export function Blank({
  value,
  onValueChange,
  label,
  size = 8,
}: {
  value: string;
  onValueChange: (v: string) => void;
  label: string;
  size?: number;
}) {
  return (
    <input
      className="blank"
      aria-label={label}
      size={size}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
}

export function OptionRow({
  label,
  sub,
  selected,
  onSelect,
  multi,
  tag,
  lang,
  dir,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onSelect: () => void;
  multi?: boolean;
  tag?: ReactNode;
  /* Set these when the row's own words are in a different language from the
     page, as in the language picker. They go on the label alone, so the
     radio mark and the row's own layout stay with the page's direction. */
  lang?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      className={`option-row ${selected ? "option-row-on" : ""}`}
      onClick={onSelect}
    >
      <span className="tile-text">
        <span
          className={lang ? "lang-name" : undefined}
          lang={lang}
          dir={dir}
          style={{ display: "block", fontWeight: 600 }}
        >
          {label}
        </span>
        {sub ? (
          <span
            className={`tile-desc ${lang ? "lang-name-en" : ""}`}
            lang={lang ? "en" : undefined}
            dir={lang ? "ltr" : undefined}
          >
            {sub}
          </span>
        ) : null}
        {tag ? <span className="mt-8">{tag}</span> : null}
      </span>
      <span
        className={`${multi ? "check-mark" : "radio-mark"} ${
          selected ? "mark-on" : ""
        }`}
        aria-hidden="true"
      >
        {selected ? (
          multi ? (
            <TickIcon width={18} height={18} />
          ) : (
            <span className="radio-dot" />
          )
        ) : null}
      </span>
    </button>
  );
}

export function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: ReactNode;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className="check-row"
      onClick={onToggle}
    >
      <span
        className={`check-mark ${checked ? "mark-on" : ""}`}
        aria-hidden="true"
      >
        {checked ? <TickIcon width={18} height={18} /> : null}
      </span>
      <span style={{ color: checked ? "var(--ink-2)" : undefined }}>
        {label}
      </span>
    </button>
  );
}

export function Chip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`chip ${selected ? "chip-on" : ""}`}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          className={`segmented-cell ${
            value === o.value ? "segmented-cell-on" : ""
          }`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* The words "चालू" and "बंद" are printed beside the track, so the state is
   never carried by position and colour alone. */
export function Switch({
  label,
  checked,
  onToggle,
  onWord,
  offWord,
  sub,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onWord: string;
  offWord: string;
  sub?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="setting-row"
      onClick={onToggle}
    >
      <span className="tile-text">
        <span style={{ display: "block" }}>{label}</span>
        {sub ? <span className="tile-desc">{sub}</span> : null}
      </span>
      <span
        style={{ display: "flex", alignItems: "center", gap: 8, flex: "none" }}
      >
        <span className="t-caption ink-2">{checked ? onWord : offWord}</span>
        <span
          className={`switch-track ${checked ? "switch-track-on" : ""}`}
          aria-hidden="true"
        >
          <span className="switch-thumb" />
        </span>
      </span>
    </button>
  );
}

/* ========================================================== tables ======= */

export function KeyValue({
  rows,
  head,
}: {
  rows: { k: string; v: ReactNode }[];
  head?: [string, string];
}) {
  return (
    <table className="kv">
      {head ? (
        <thead>
          <tr>
            <th scope="col">{head[0]}</th>
            <th scope="col">{head[1]}</th>
          </tr>
        </thead>
      ) : null}
      <tbody>
        {rows.map((r) => (
          <tr key={r.k}>
            <th scope="row">{r.k}</th>
            <td>{r.v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DateBlock({ day, month }: { day: string; month: string }) {
  return (
    <span className="date-block" aria-hidden="true">
      <span className="date-day num">{day}</span>
      <span className="date-mon" style={{ display: "block" }}>
        {month}
      </span>
    </span>
  );
}
