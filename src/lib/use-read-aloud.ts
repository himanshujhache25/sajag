"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { isLang, localeOf } from "@/lib/i18n/langs";

/* Read-aloud uses the voices already on the phone. No audio is recorded, no
   audio is sent anywhere. If the phone has no voice for the chosen language
   we say so rather than reading its words in an English voice. */
export function useReadAloud(lang: string) {
  const [speaking, setSpeaking] = useState(false);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof speechSynthesis === "undefined") return;
    speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  useEffect(() => stop, [stop]);

  const speak = useCallback(
    (text: string) => {
      if (typeof speechSynthesis === "undefined") return false;
      speechSynthesis.cancel();
      const said = new SpeechSynthesisUtterance(text);
      /* One place decides the BCP-47 tag, so adding a language does not mean
         remembering to fix a string concatenation here. Urdu is ur-IN, not
         ur-PK, because that is the voice an Indian phone is likely to have. */
      said.lang = isLang(lang) ? localeOf(lang) : "hi-IN";
      said.rate = 0.95;
      said.onend = () => setSpeaking(false);
      said.onerror = () => setSpeaking(false);
      utterance.current = said;
      setSpeaking(true);
      speechSynthesis.speak(said);
      return true;
    },
    [lang],
  );

  const available =
    typeof window !== "undefined" && "speechSynthesis" in window;

  return { speak, stop, speaking, available };
}
