"use client";

/* ============================================================================
   The notepad composer. This is the one thing the app is for, so it is the
   first thing on the home screen and it owns every way a message can arrive:
   typed, spoken, photographed, pasted, or shared in from WhatsApp.

   It is deliberately a single component rather than a home version and a
   check version, because the two screens must not drift apart.
   Section 4 and 5.1 of docs/UI_SPEC.md.
   ========================================================================== */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  ArrowIcon,
  CameraIcon,
  LockIcon,
  MicIcon,
  PasteIcon,
  ShareIcon,
} from "@/components/icons";
import { Button, InlineLink, ProgressRuler, Tag } from "@/components/ui";
import { Sheet } from "@/components/ui/overlay";
import { UndoBar, useUndo } from "@/components/ui/undo";
import { useSettings } from "@/components/use-settings";
import { useOnline } from "@/lib/client-facts";
import { isLang, localeOf } from "@/lib/i18n/langs";
import type { ContextAnswers } from "@/lib/engine/signals";
import { addToHistory } from "@/lib/history";
import { setLastResult, useEngine } from "@/lib/use-engine";
import golden from "../../../eval/golden.json";

export const MAX_CHARS = 4000;
const MIN_CHARS = 3;

/* True only after hydration, read through a store so the first client render
   still matches the server. Nothing in this file touches window during
   render, which is what kept the dev overlay quiet. */
const noop = () => () => {};
function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

export function Composer({
  answers,
  extra,
  openSamples,
}: {
  answers?: ContextAnswers;
  /* The three optional questions, rendered by /check between the card and
     the button. Home keeps the screen to one decision and passes nothing. */
  extra?: ReactNode;
  openSamples?: boolean;
}) {
  const { t, settings } = useSettings();
  const router = useRouter();
  const mounted = useMounted();
  const run = useEngine();
  const online = useOnline();
  const area = useRef<HTMLTextAreaElement>(null);
  /* The live recogniser, so the Stop button can reach it. */
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  /* What was in the box when dictation started, so speech appends to it
     rather than replacing it. */
  const baseRef = useRef("");

  const [typed, setTyped] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [hint, setHint] = useState(false);
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [samplesOpen, setSamplesOpen] = useState(!!openSamples);
  const [ocr, setOcr] = useState<number | null>(null);
  const [thumb, setThumb] = useState<string | null>(null);
  const { pending, offer, undo, dismiss } = useUndo();

  /* Pull the result page down now, while there may still be a network. */
  useEffect(() => {
    router.prefetch("/check/result");
  }, [router]);

  /* The share target is a GET to /check?text=…, so a forwarded message lands
     straight in the box. `?sample=G1` does the same with a golden message,
     which is how Home's "common traps" rows open: the person sees the trap
     sitting in their own composer and presses the same button they would
     press for a real message, rather than being shown a canned verdict.
     Read in a memo, never in an effect. */
  const entry = useMemo(() => {
    if (!mounted) return { text: "", sample: false, mode: "" };
    const p = new URLSearchParams(window.location.search);
    const id = p.get("sample");
    /* Home's "Speak" and "Photo" buttons arrive here with ?mode=. The
       parameter used to be written and never read, so both buttons landed
       the person on an empty box with nothing started — which is what made
       the two features look broken.

       The mic is still not started from a query parameter: a navigation
       ends the user gesture, so most browsers refuse, and a microphone that
       opens itself is a nasty surprise besides. The mode instead focuses
       the tool and rings it, so the thing they asked for is under their
       thumb and one obvious tap away. */
    const mode = p.get("mode") === "voice" || p.get("mode") === "photo"
      ? (p.get("mode") as string)
      : "";
    if (id) {
      const found = (golden.messages as { id: string; text: string }[]).find(
        (m) => m.id === id,
      );
      if (found) return { text: found.text.slice(0, MAX_CHARS), sample: true, mode };
    }
    return {
      text: [p.get("text"), p.get("url")]
        .filter(Boolean)
        .join(" ")
        .trim()
        .slice(0, MAX_CHARS),
      sample: false,
      mode,
    };
  }, [mounted]);

  const shared = entry.text;
  const isSample = entry.sample && typed === null;
  /* Which tool arrived ringed, and whether that ring has been used up.
     Derived rather than copied into state by an effect: `entry.mode` comes
     from the URL and only changes on navigation, so mirroring it through
     useEffect bought nothing and cost a cascading render. */
  const [dismissed, setDismissed] = useState(false);
  const primed = dismissed ? "" : entry.mode;

  const micRef = useRef<HTMLButtonElement>(null);
  const photoRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (primed === "voice") micRef.current?.focus();
    if (primed === "photo") photoRef.current?.focus();
  }, [primed]);

  const text = typed ?? shared;
  const fromShare = shared.length > 0 && typed === null && !isSample;
  const canCheck = text.trim().length >= MIN_CHARS;
  const setText = (v: string) => setTyped(v.slice(0, MAX_CHARS));

  async function onPaste() {
    try {
      const clip = await navigator.clipboard.readText();
      setText((text + " " + clip).trim());
      setNotice("");
    } catch {
      setNotice(t("check.pasteDenied"));
    }
  }

  async function onPhoto(file: File) {
    /* Tesseract fetches its worker, wasm and traineddata on first use. With
       no network that fetch fails deep inside the library and surfaces as
       "could not read the picture", which blames the photo for a connection
       problem and sends the person off to retake it. */
    if (!online) {
      setNotice(t("check.ocrOffline"));
      return;
    }
    setNotice("");
    setOcr(0);
    /* Revoke the previous preview before replacing it. On a low-end phone,
       several photos in a row otherwise pin every full-size image in memory
       until the tab is closed. */
    setThumb((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
    try {
      const { readImage } = await import("@/lib/ocr");
      const result = await readImage(file, setOcr, settings.lang);
      setText((text + "\n" + result.text).trim());
      /* Below 60 percent confidence the person should read it through
         before trusting what landed in the box. */
      if (result.confidence < 60) setNotice(t("check.ocrLowConfidence"));
    } catch {
      setNotice(t("check.ocrFailed"));
    } finally {
      setOcr(null);
    }
  }

  function onSpeak() {
    /* Pressing the button while it is listening must stop it. The recogniser
       used to be a local inside this function, so nothing could reach it
       afterwards: the button said "Stop", and starting a second recogniser
       on top of a live one throws InvalidStateError. Holding it in a ref is
       what makes the label true. */
    if (listening) {
      recRef.current?.stop();
      return;
    }
    if (!online) {
      setNotice(t("check.voiceOffline"));
      return;
    }
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) {
      setNotice(t("check.voiceUnavailable"));
      return;
    }
    const rec = new Ctor();
    recRef.current = rec;
    /* The same locale table the rest of the app uses. Dictation in a
       language the phone has no model for simply does nothing, which is why
       the paste and photo routes are always offered beside the mic. */
    const tag = document.documentElement.lang;
    rec.lang = isLang(tag) ? localeOf(tag) : "hi-IN";
    /* Someone reading a long forwarded message aloud pauses to find their
       place. Without `continuous` the first pause ends the recognition and
       the rest of the message is lost. */
    rec.continuous = true;
    rec.interimResults = true;

    /* Appends onto whatever is on screen, which is not the same as `typed`.
       A message that arrived by share or sample lives in `shared` with
       `typed` still null, so the old `(cur ?? "")` silently threw that text
       away the moment someone added a word by voice. */
    let settled = "";
    rec.onresult = (event) => {
      let fresh = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const said = result[0]?.transcript ?? "";
        if (result.isFinal) fresh += said;
        else interim += said;
      }
      if (fresh) settled = (settled + " " + fresh).trim();
      const combined = (settled + " " + interim).trim();
      setTyped((baseRef.current + " " + combined).trim().slice(0, MAX_CHARS));
    };

    rec.onerror = (event) => {
      recRef.current = null;
      setListening(false);
      /* "no-speech" and a refused permission are ordinary situations, not a
         phone that cannot do dictation, and telling someone their phone is
         broken when they simply said nothing sends them down the wrong path. */
      const code = event?.error ?? "";
      if (code === "no-speech") setNotice(t("check.voiceNothingHeard"));
      else if (code === "not-allowed" || code === "service-not-allowed")
        setNotice(t("check.voiceDenied"));
      else if (code === "aborted") setNotice("");
      else setNotice(t("check.voiceUnavailable"));
    };
    rec.onend = () => {
      recRef.current = null;
      setListening(false);
    };

    baseRef.current = text;
    setListening(true);
    setNotice("");
    rec.start();
  }

  /* A recogniser left running after the screen goes away keeps the
     microphone indicator lit on the phone. */
  useEffect(() => {
    return () => {
      recRef.current?.abort();
      recRef.current = null;
    };
  }, []);

  /* There is deliberately no "start listening on load" path. A microphone
     that opens itself because of a query parameter is both a permissions
     failure on most browsers and a nasty surprise for the person holding the
     phone. The mic is one tap away in the toolbar instead. */

  /* The button is never disabled. A grey button tells a first-time user
     nothing; a focused box and one plain line tells them what to do. */
  async function onCheck() {
    if (!canCheck) {
      setHint(true);
      area.current?.focus();
      return;
    }
    setBusy(true);
    const input = { text: text.slice(0, MAX_CHARS), context: answers, online };
    const verdict = await run(input);
    setLastResult(input, verdict);
    void addToHistory(input.text, verdict);
    router.push("/check/result");
  }

  return (
    <div>
      {fromShare ? (
        <p
          className="note"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <ShareIcon width={20} height={20} aria-hidden="true" />
          <span className="t-small">{t("composer.fromShare")}</span>
        </p>
      ) : null}

      {/* A sample is labelled every time it is shown. Someone who lands here
          from "common traps" must never be left thinking a made-up message
          was something that actually arrived on their phone. */}
      {isSample ? (
        <p className="banner" role="status">
          <Tag>{t("check.samples")}</Tag>
          <span className="t-small">{t("sample.banner")}</span>
        </p>
      ) : null}

      <div className={`composer ${fromShare || isSample ? "mt-12" : ""}`}>
        {text.length > 0 ? (
          <div className="composer-head">
            <Button
              variant="text"
              size="md"
              onClick={() => {
                /* Everything the tap throws away, held together so the bar
                   can put the composer back exactly as it stood — including
                   the photo thumbnail, which is the slowest thing to redo. */
                const was = { text, notice, thumb };
                setText("");
                setNotice("");
                setThumb(null);
                area.current?.focus();
                offer({
                  message: t("composer.cleared"),
                  restore: () => {
                    setText(was.text);
                    setNotice(was.notice);
                    setThumb(was.thumb);
                    area.current?.focus();
                  },
                });
              }}
            >
              {t("composer.clear")}
            </Button>
            <span className="t-caption ink-2 num">
              {text.length} / {MAX_CHARS}
            </span>
          </div>
        ) : null}

        <label className="sr-only" htmlFor="message">
          {t("composer.label")}
        </label>
        <textarea
          id="message"
          ref={area}
          className="composer-area"
          value={text}
          placeholder={t("composer.placeholder")}
          enterKeyHint="done"
          onChange={(e) => {
            setText(e.target.value);
            setHint(false);
          }}
        />

        {ocr !== null ? (
          <div
            className="composer-tools"
            style={{ padding: 12, gap: 12, alignItems: "center" }}
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                width={48}
                height={48}
                style={{
                  width: 48,
                  height: 48,
                  objectFit: "cover",
                  borderRadius: "var(--r-sm)",
                }}
              />
            ) : null}
            <div style={{ flex: 1 }}>
              <ProgressRuler
                value={Math.round(ocr * 100)}
                label={t("composer.photoReading", {
                  pct: Math.round(ocr * 100),
                })}
              />
            </div>
          </div>
        ) : (
          <div className="composer-tools">
            <button
              type="button"
              ref={micRef}
              className={`composer-tool ${listening ? "composer-tool-live" : ""} ${
                primed === "voice" ? "composer-tool-primed" : ""
              }`}
              onClick={() => {
                setDismissed(true);
                onSpeak();
              }}
              aria-pressed={listening}
            >
              {listening ? (
                <span className="rec-dot" aria-hidden="true" />
              ) : (
                <MicIcon aria-hidden="true" />
              )}
              {listening ? t("common.stop") : t("composer.speak")}
            </button>
            <button
              type="button"
              ref={photoRef}
              className={`composer-tool ${primed === "photo" ? "composer-tool-primed" : ""}`}
              onClick={() => {
                setDismissed(true);
                document.getElementById("photo")?.click();
              }}
            >
              <CameraIcon aria-hidden="true" />
              {t("composer.photo")}
            </button>
            <button
              type="button"
              className="composer-tool"
              onClick={() => {
                setDismissed(true);
                void onPaste();
              }}
            >
              <PasteIcon aria-hidden="true" />
              {t("composer.paste")}
            </button>
          </div>
        )}
      </div>

      {/* The visible control is the "Photo" button above; this input is the
          real file picker, kept off-screen. Off-screen is not the same as
          absent — a screen reader still reaches it in the tab order, and
          without a name it announces only "file upload button". axe called
          this a critical failure and it was right. */}
      <input
        id="photo"
        type="file"
        accept="image/*"
        capture="environment"
        aria-label={t("composer.photo")}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onPhoto(file);
        }}
      />

      {thumb && ocr === null ? (
        <p className="privacy-line mt-12">
          <LockIcon width={16} height={16} aria-hidden="true" />
          {t("composer.photoPrivacy")}
        </p>
      ) : null}

      {/* Says why a button is ringed. Without this the ring is decoration;
          with it, the person who pressed "Speak" on Home knows the tap they
          still owe. */}
      {primed ? (
        <p className="t-small ink-2 mt-12" role="status">
          {primed === "voice" ? t("composer.primedVoice") : t("composer.primedPhoto")}
        </p>
      ) : null}

      {notice ? (
        <p className="t-small mt-12" role="status" style={{ color: "var(--danger)" }}>
          {notice}
        </p>
      ) : null}

      {extra ? <div className="mt-20">{extra}</div> : null}

      <div className="mt-12">
        <Button onClick={onCheck} full disabled={busy}>
          {t("composer.submit")}
          <ArrowIcon aria-hidden="true" />
        </Button>
      </div>

      {hint ? (
        <p className="t-small ink-2 mt-8" role="status">
          {t("composer.empty")}
        </p>
      ) : null}

      <p className="privacy-line mt-12">
        <LockIcon width={16} height={16} aria-hidden="true" />
        {t("composer.privacy")}
      </p>

      <p className="t-small mt-8">
        <button
          type="button"
          className="inline-link"
          onClick={() => setSamplesOpen(true)}
        >
          {t("home.sampleLink")}
        </button>
      </p>

      <Sheet
        open={samplesOpen}
        onClose={() => setSamplesOpen(false)}
        title={t("check.samplesTitle")}
        closeLabel={t("common.close")}
      >
        <p className="t-small ink-2">{t("check.samplesLine")}</p>
        <ul className="mt-16">
          {golden.messages.map((sample) => (
            <li key={sample.id}>
              <button
                type="button"
                className="ledger-row"
                onClick={() => {
                  setText(sample.text);
                  setSamplesOpen(false);
                  area.current?.focus();
                }}
              >
                <span className="t-small tile-text">{sample.text.slice(0, 90)}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-16">
          <InlineLink href="/check?demo=1">{t("check.useSample")}</InlineLink>
        </p>
      </Sheet>

      <UndoBar pending={pending} onUndo={undo} onDismiss={dismiss} />
    </div>
  );
}

/* The browser speech API is still prefixed on several Android browsers and is
   not in the DOM lib, so the slice we use is typed here. */
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: {
    resultIndex: number;
    results: {
      length: number;
      [i: number]: { isFinal: boolean; [j: number]: { transcript: string } };
    };
  }) => void;
  onerror: (event: { error?: string }) => void;
  onend: () => void;
};
