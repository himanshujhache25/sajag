/* The safety card. Section 8.8 of docs/SPEC.md.

   A 1080 by 1350 image, drawn to look like a page torn out of the ledger,
   so it survives being forwarded through WhatsApp and still reads at thumb
   size. The wrapping is a pure function so it can be tested without a
   canvas; everything that needs a real context is kept below it. */
import { saveBlob } from "./save-blob";

export const CARD_W = 1080;
export const CARD_H = 1350;

const PAD = 80;
const RULE_GAP = 54;

export type CardText = {
  appName: string;
  heading: string;
  /* The five things a real adviser never does. */
  lines: string[];
  footer: string[];
  disclaimer: string;
};

/* Greedy wrap. `measure` is passed in so a test can use a fake one and this
   file never has to touch a canvas to be checked. A single word longer than
   the line is left alone rather than cut in half: a UPI id or a URL must
   stay readable even if it overhangs. */
export function wrapText(
  measure: (s: string) => number,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let line = words[0];

  for (const word of words.slice(1)) {
    const tried = `${line} ${word}`;
    if (measure(tried) <= maxWidth) line = tried;
    else {
      lines.push(line);
      line = word;
    }
  }
  lines.push(line);
  return lines;
}

/* The colours are read off the live page so the card matches whatever theme
   the person is in, including high contrast. */
function readTokens(): { paper: string; ink: string; rule: string; stamp: string } {
  const s = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;
  return {
    paper: pick("--paper", "#f7f1e3"),
    ink: pick("--ink", "#1f1b16"),
    rule: pick("--rule", "#cdbfa6"),
    stamp: pick("--stamp", "#9b2c2c"),
  };
}

export function drawCard(canvas: HTMLCanvasElement, text: CardText): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const { paper, ink, rule, stamp } = readTokens();

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  /* The faint ruling of the ledger, and the red margin line down the left. */
  ctx.strokeStyle = rule;
  ctx.lineWidth = 2;
  for (let y = PAD + RULE_GAP; y < CARD_H - PAD; y += RULE_GAP) {
    ctx.beginPath();
    ctx.moveTo(PAD, y);
    ctx.lineTo(CARD_W - PAD, y);
    ctx.stroke();
  }
  ctx.strokeStyle = stamp;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(PAD + 46, PAD - 20);
  ctx.lineTo(PAD + 46, CARD_H - PAD + 20);
  ctx.stroke();

  /* A double rule across the top, the way a ledger page opens. */
  ctx.strokeStyle = ink;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(PAD, PAD + 150);
  ctx.lineTo(CARD_W - PAD, PAD + 150);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PAD, PAD + 162);
  ctx.lineTo(CARD_W - PAD, PAD + 162);
  ctx.stroke();

  const left = PAD + 80;
  const width = CARD_W - left - PAD;
  const w = (s: string) => ctx.measureText(s).width;

  ctx.fillStyle = ink;
  ctx.textBaseline = "top";

  ctx.font = "500 34px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText(text.appName, left, PAD + 20);

  ctx.font = "700 58px ui-serif, Georgia, serif";
  let y = PAD + 200;
  for (const line of wrapText(w, text.heading, width)) {
    ctx.fillText(line, left, y);
    y += 70;
  }

  /* The five lines, numbered, each with a red cross before it. */
  y += 30;
  ctx.font = "400 42px ui-sans-serif, system-ui, sans-serif";
  text.lines.forEach((line, i) => {
    ctx.fillStyle = stamp;
    ctx.font = "700 42px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("×", left, y + 4);

    ctx.fillStyle = ink;
    ctx.font = "400 42px ui-sans-serif, system-ui, sans-serif";
    for (const part of wrapText(w, line, width - 60)) {
      ctx.fillText(part, left + 60, y);
      y += 54;
    }
    if (i < text.lines.length - 1) y += 26;
  });

  /* The footer sits in a boxed stamp so it survives being cropped. */
  const boxTop = CARD_H - PAD - 290;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 4;
  ctx.strokeRect(left, boxTop, width, 210);

  ctx.fillStyle = ink;
  ctx.font = "600 40px ui-sans-serif, system-ui, sans-serif";
  let fy = boxTop + 30;
  for (const line of text.footer) {
    for (const part of wrapText(w, line, width - 60)) {
      ctx.fillText(part, left + 30, fy);
      fy += 50;
    }
  }

  ctx.font = "400 28px ui-sans-serif, system-ui, sans-serif";
  ctx.fillStyle = ink;
  ctx.globalAlpha = 0.75;
  let dy = CARD_H - PAD - 56;
  for (const part of wrapText(w, text.disclaimer, width)) {
    ctx.fillText(part, left, dy);
    dy += 34;
  }
  ctx.globalAlpha = 1;
}

export function cardToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

export function downloadCard(blob: Blob, filename: string): void {
  saveBlob(blob, filename);
}

/* True only when the phone can share this actual file. Anything less and we
   fall back to a download rather than opening a share sheet that drops the
   image silently. */
export function canShareCard(file: File): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] })
  );
}
