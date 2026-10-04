import { dirOf, isLang, matchLang, scriptOf, type Lang } from "@/lib/i18n/langs";

export type Settings = {
  lang: Lang;
  textScale: 1 | 1.25 | 1.5;
  contrast: "normal" | "high";
  theme: "light" | "dark" | "auto";
  autoRead: boolean;
  simpleMode: boolean;
  keepHistory: boolean;
  onboarded: boolean;
};

export const DEFAULTS: Settings = {
  lang: "hi",
  textScale: 1,
  contrast: "normal",
  /* Light, even on a dark OS. The warm paper is the product's identity and
     outdoor readability on a cheap screen matters more than matching the
     system. Dark and Auto are one tap away in Settings. */
  theme: "light",
  autoRead: false,
  simpleMode: false,
  keepHistory: true,
  onboarded: false,
};

export const STORE_KEY = "sajag.settings.v1";

let snapshot: Settings = DEFAULTS;
let loaded = false;
const listeners = new Set<() => void>();

function parse(raw: string | null): Settings {
  if (!raw) return { ...DEFAULTS, lang: guessLang() };
  try {
    const value = JSON.parse(raw) as Partial<Settings>;
    return {
      ...DEFAULTS,
      ...value,
      lang: isLang(value.lang) ? value.lang : DEFAULTS.lang,
    };
  } catch {
    return DEFAULTS;
  }
}

/* First visit only: if the phone is already set to one of our twelve, open
   in it. Someone whose phone is in Tamil should not have to find the picker
   in a script they cannot read. Anything else falls to Hindi, the default.
   `navigator.languages` is read in order, so "ta-IN, en-IN" picks Tamil. */
function guessLang(): Lang {
  try {
    const tags = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    for (const tag of tags) {
      const found = matchLang(tag);
      if (found) return found;
    }
  } catch {
    /* no navigator: server render or a locked-down browser */
  }
  return DEFAULTS.lang;
}

function applyToDocument(s: Settings) {
  const root = document.documentElement;
  const dark =
    s.theme === "dark" ||
    (s.theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.setAttribute("data-theme", dark ? "dark" : "light");
  root.setAttribute("data-contrast", s.contrast);
  root.setAttribute("lang", s.lang);
  /* Urdu runs right to left. Setting `dir` on <html> is what flips the whole
     layout, because every edge in the stylesheet is written as an inline
     start or end, not as left or right. */
  root.setAttribute("dir", dirOf(s.lang));
  /* The font stack is chosen by script, not by language, so Hindi and
     Marathi share one stack and Punjabi gets Gurmukhi. See styles/i18n.css. */
  root.setAttribute("data-script", scriptOf(s.lang));
  const scale = s.simpleMode ? Math.max(1.5, s.textScale) : s.textScale;
  root.style.setProperty("--text-scale", String(scale));
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/* Reads storage once, then serves the cached object so the snapshot stays
   referentially stable between renders. */
export function getSnapshot(): Settings {
  if (!loaded) {
    try {
      snapshot = parse(window.localStorage.getItem(STORE_KEY));
    } catch {
      snapshot = DEFAULTS;
    }
    loaded = true;
  }
  return snapshot;
}

export function getServerSnapshot(): Settings {
  return DEFAULTS;
}

export function setSettings(patch: Partial<Settings>) {
  snapshot = { ...getSnapshot(), ...patch };
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(snapshot));
  } catch {
    /* private mode: the session copy still works */
  }
  applyToDocument(snapshot);
  for (const listener of listeners) listener();
}

export function resetSettings() {
  snapshot = DEFAULTS;
  loaded = true;
  try {
    window.localStorage.removeItem(STORE_KEY);
  } catch {
    /* storage blocked */
  }
  applyToDocument(snapshot);
  for (const listener of listeners) listener();
}
