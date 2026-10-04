"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "./index";
import { useSettings } from "@/components/use-settings";

/* Reversal, for the actions that throw something away.

   The pattern is "act now, keep the pieces". The screen updates the moment
   the person taps, because waiting feels broken, but whatever was removed is
   held in memory and a bar offers it back. If the bar is ignored it fades and
   the memory goes with it.

   This is deliberately not a confirmation dialogue. A dialogue asks a person
   to predict whether they will regret something; an undo lets them find out.
   For an audience that is often unsure whether they pressed the right thing,
   the second is kinder and faster.

   The one action that does NOT use this is "erase everything" in settings.
   That wipes the store itself, so there would be nothing left to restore —
   keeping its confirmation step is honest rather than inconsistent. */

const WINDOW_MS = 8_000;

export type Undoable = {
  /* What just happened, in the person's language. Shown in the bar. */
  message: string;
  /* Put it back. May be async; the bar closes as soon as it is called. */
  restore: () => void | Promise<void>;
};

export function useUndo() {
  const [pending, setPending] = useState<Undoable | null>(null);
  const timer = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setPending(null);
  }, []);

  /* Offer a way back. Calling this again replaces any bar already showing,
     so a person who clears twice in a row is never offered a stale restore. */
  const offer = useCallback(
    (undoable: Undoable) => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      setPending(undoable);
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setPending(null);
      }, WINDOW_MS);
    },
    [],
  );

  const undo = useCallback(() => {
    if (pending === null) return;
    const { restore } = pending;
    dismiss();
    void restore();
  }, [pending, dismiss]);

  /* A pending bar left behind by a page the person has navigated away from
     would be a promise we cannot keep. */
  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  return { pending, offer, undo, dismiss };
}

export function UndoBar({
  pending,
  onUndo,
  onDismiss,
}: {
  pending: Undoable | null;
  onUndo: () => void;
  onDismiss: () => void;
}) {
  const { t } = useSettings();
  if (pending === null) return null;

  return (
    /* role="status" rather than "alert": this is an offer, not a problem,
       and it should not interrupt whatever a screen reader is saying. */
    <div className="undo-bar" role="status">
      <span className="undo-bar-text">{pending.message}</span>
      <div className="undo-bar-actions">
        <Button variant="secondary" size="md" onClick={onUndo}>
          {t("common.undo")}
        </Button>
        <Button
          variant="text"
          size="md"
          onClick={onDismiss}
          aria-label={t("common.close")}
        >
          {t("common.close")}
        </Button>
      </div>
    </div>
  );
}
