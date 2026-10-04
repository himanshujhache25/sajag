"use client";

/* On-device OCR. The picture is downscaled, turned grey and contrast-stretched
   on a canvas, then read by Tesseract in its own worker. The assets are only
   fetched when a person actually chooses a photo, and the image itself never
   leaves the phone. */

import type { Lang } from "@/lib/i18n/langs";

export type OcrResult = {
  text: string;
  confidence: number;
};

/* Tesseract's own three-letter codes, which are not the BCP-47 tags the rest
   of the app uses. Only the twelve languages Sajag speaks are listed; a
   language absent here falls back to English alone. */
const TRAINEDDATA: Record<Lang, string | null> = {
  en: null,
  hi: "hin",
  mr: "mar",
  gu: "guj",
  ta: "tam",
  bn: "ben",
  te: "tel",
  kn: "kan",
  ml: "mal",
  or: "ori",
  pa: "pan",
  ur: "urd",
};

export function traineddataFor(lang?: Lang): string[] {
  const extra = lang ? TRAINEDDATA[lang] : null;
  return extra ? ["eng", extra] : ["eng"];
}

const MAX_SIDE = 1600;

export async function prepareImage(file: File): Promise<HTMLCanvasElement> {
  /* createImageBitmap applies the EXIF rotation for us, so a photo taken
     sideways is read the right way up. */
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return canvas;

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const image = context.getImageData(0, 0, width, height);
  const data = image.data;

  let low = 255;
  let high = 0;
  for (let i = 0; i < data.length; i += 4) {
    const grey = Math.round(
      0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2],
    );
    data[i] = grey;
    data[i + 1] = grey;
    data[i + 2] = grey;
    if (grey < low) low = grey;
    if (grey > high) high = grey;
  }

  const range = Math.max(1, high - low);
  for (let i = 0; i < data.length; i += 4) {
    const stretched = ((data[i] - low) * 255) / range;
    data[i] = stretched;
    data[i + 1] = stretched;
    data[i + 2] = stretched;
  }

  context.putImageData(image, 0, 0);
  return canvas;
}

export async function readImage(
  file: File,
  onProgress: (fraction: number) => void,
  lang?: Lang,
): Promise<OcrResult> {
  const canvas = await prepareImage(file);
  const { createWorker } = await import("tesseract.js");

  /* Always pair the reading language with English. Scam messages are mixed
     in practice — a Tamil message still says "OTP", "UPI" and "SEBI" in
     Latin letters, and a model given only `tam` transliterates those into
     nonsense that the engine then cannot match against its lexicon. */
  const worker = await createWorker(traineddataFor(lang), undefined, {
    /* Serve the engine from our own origin. Left to itself Tesseract pulls
       the worker, the wasm core and each language file from a CDN, which the
       Content-Security-Policy blocks outright — so photo reading failed every
       time and blamed the photo for it. Serving the files ourselves also
       means a CDN never learns the IP address of somebody checking a message.
       `scripts/ocr-assets.mjs` puts them in place on install. */
    workerPath: "/tesseract/worker.min.js",
    corePath: "/tesseract/core",
    langPath: "/tesseract/lang",
    logger: (message: { status: string; progress: number }) => {
      if (message.status === "recognizing text") onProgress(message.progress);
    },
  });

  try {
    const { data } = await worker.recognize(canvas);
    return { text: data.text.trim(), confidence: data.confidence ?? 0 };
  } finally {
    await worker.terminate();
  }
}
