/* Vendors the OCR engine into public/ so that reading a photo never touches a
   third-party CDN.

   Tesseract loads its worker, its wasm core and one language file per language
   at runtime. By default it pulls all three from jsdelivr, which the app's
   Content-Security-Policy blocks, and which would also hand a CDN the IP
   address of somebody checking a scam message. Both are good reasons to serve
   the files ourselves.

   Runs on postinstall. The output is gitignored and rebuilt from node_modules
   plus one download of the language data. */

import { mkdir, copyFile, readdir, stat, writeFile, access } from "node:fs/promises";
import { createRequire } from "node:module";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "tesseract");

/* Only the twelve languages Sajag speaks, in Tesseract's own three-letter
   codes. "fast" is the smaller of the two official data sets; on the kind of
   phone this app is built for, the accuracy difference is not worth several
   megabytes per language. */
const LANGS = [
  "eng", "hin", "mar", "guj", "tam", "ben",
  "tel", "kan", "mal", "ori", "pan", "urd",
];

const TESSDATA = "https://tessdata.projectnaptha.com/4.0.0_fast";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(join(out, "core"), { recursive: true });
  await mkdir(join(out, "lang"), { recursive: true });

  /* Resolve through each package.json rather than the entry point, because
     tesseract.js resolves to src/index.js while the built worker lives in
     dist/. */
  const pkgDir = (name) => dirname(require.resolve(`${name}/package.json`));

  // 1. The worker script.
  await copyFile(
    join(pkgDir("tesseract.js"), "dist", "worker.min.js"),
    join(out, "worker.min.js"),
  );

  // 2. The wasm core. Tesseract picks a build at runtime depending on whether
  //    the phone supports SIMD, so all three LSTM variants have to be present.
  const coreDir = pkgDir("tesseract.js-core");
  const wanted = (await readdir(coreDir)).filter((f) => f.includes("lstm"));
  let bytes = 0;
  for (const file of wanted) {
    await copyFile(join(coreDir, file), join(out, "core", file));
    bytes += (await stat(join(coreDir, file))).size;
  }

  // 3. Language data, downloaded once and then kept.
  let fetched = 0;
  for (const lang of LANGS) {
    const target = join(out, "lang", `${lang}.traineddata.gz`);
    if (await exists(target)) continue;
    const res = await fetch(`${TESSDATA}/${lang}.traineddata.gz`);
    if (!res.ok) {
      console.warn(`  ! ${lang}: ${res.status}, skipped`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(target, buf);
    bytes += buf.length;
    fetched += 1;
  }

  console.log(
    `ocr-assets: ${wanted.length} core files, ${fetched} language files ` +
      `downloaded, ${(bytes / 1048576).toFixed(1)} MB in public/tesseract`,
  );
}

main().catch((error) => {
  /* A failure here must not break `npm install`. The app checks for the assets
     and tells the person to paste instead, which is a far better outcome than
     an install that will not complete. */
  console.warn("ocr-assets: could not vendor the OCR engine:", error.message);
});
