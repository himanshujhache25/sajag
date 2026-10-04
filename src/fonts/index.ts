import localFont from "next/font/local";

/* Self-hosted, no CDN. Mukta carries Devanagari and Latin with matching
   metrics, so a Hindi line with "OTP" or "SEBI" in it does not jump.
   Tiro is the bookish serif for headings and the wordmark.
   `font-synthesis: none` is set in base.css: we never fake a bold. */

export const mukta = localFont({
  src: [
    {
      path: "./mukta-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./mukta-devanagari-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./mukta-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./mukta-devanagari-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans-loaded",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Noto Sans",
    "Noto Sans Devanagari",
    "Noto Sans Bengali",
    "Noto Sans Tamil",
    "Noto Sans Telugu",
    "Noto Sans Gujarati",
    "sans-serif",
  ],
});

export const tiro = localFont({
  src: [
    {
      path: "./tiro-devanagari-hindi-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./tiro-devanagari-hindi-devanagari-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-serif-loaded",
  display: "swap",
  /* Headings can wait a beat; the body font owns the critical path. */
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["Noto Serif", "Noto Serif Devanagari", "Georgia", "serif"],
});
