"use client";

/* Overlays: the bottom sheet and the snackbar. Both are the same object on a
   desktop and a phone, only placed differently; nothing in the app ever opens
   a browser alert. Section 4 of docs/UI_SPEC.md. */

import { useEffect, useRef, type ReactNode } from "react";
import { CrossIcon } from "@/components/icons";
import { IconButton } from "@/components/ui";

export function Sheet({
  open,
  onClose,
  title,
  closeLabel,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    /* Focus goes into the sheet and comes back to the trigger on close, so a
       keyboard user never lands at the top of the document. */
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])',
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="sheet"
      >
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-head">
          <h2 className="t-serif" style={{ fontSize: "var(--t-h3)" }}>
            {title}
          </h2>
          <IconButton label={closeLabel} onClick={onClose}>
            <CrossIcon />
          </IconButton>
        </div>
        <div className="sheet-body">{children}</div>
        {footer ? <div className="sheet-body">{footer}</div> : null}
      </div>
    </>
  );
}

/* Three seconds, one line, never carrying anything the person must act on. */
export function Snackbar({
  message,
  onDone,
}: {
  message: string | null;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(onDone, 3000);
    return () => window.clearTimeout(id);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <p className="snackbar" role="status">
      {message}
    </p>
  );
}
