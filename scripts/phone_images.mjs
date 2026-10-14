#!/usr/bin/env node
/**
 * Phone images: turn the product photo chosen for each phone into a uniform WebP.
 *
 *   npm run phones:images                 # every phone in scripts/phone-images.json
 *   npm run phones:images -- slug slug    # only these phones
 *   npm run phones:images -- --refresh    # download sources again instead of using the cache
 *
 * Sources are listed by hand in scripts/phone-images.json (one entry per phone slug):
 *   "url"        direct image URL (official packshot: front-on, plain background, one device)
 *   "file"       or a local image instead of a URL (path relative to the repo)
 *   "sourcePage" where the image came from, for credit and re-checking
 *   "alt"        optional; defaults to "<name>, front view"
 *   "crop"       optional [left, top, width, height] in source pixels, e.g. to keep the front of a
 *                front+back photo. Applied before anything else.
 *   "note"       for reviewers: angle, reuse, known weaknesses. An entry with no url/file is skipped.
 *
 * Every image gets the same treatment: the plain background is removed (flood fill from the edges,
 * so white parts of the phone itself stay), the device is trimmed to its outline, scaled so it is
 * DEVICE px tall (or wide, if wider than tall), and centred on a transparent CANVAS x CANVAS square.
 * Output: src/assets/phones/<slug>.webp, and the phone's JSON gets "image" and "imageAlt".
 * A review sheet with warnings goes to .cache/phone-images/review.html.
 */
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = path.join(ROOT, 'scripts/phone-images.json');
const PHONES = path.join(ROOT, 'src/content/phones');
const ASSETS = path.join(ROOT, 'src/assets/phones');
const CACHE = path.join(ROOT, '.cache/phone-images');

const CANVAS = 1200; // output is CANVAS x CANVAS
const DEVICE = 1080; // the device's longest side; the rest is equal padding
const MIN_SOURCE = 600; // warn when the device is smaller than this in the source (upscaled, may look soft)
const BG_TOLERANCE = 12; // channel difference still counted as background
const BG_EDGE = 40; // up to here, pixels touching the background fade out (anti-aliased edge)
const UNIFORM_BORDER = 0.6; // share of edge pixels that must be background (the device may touch the edge)

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const only = args.filter((a) => !a.startsWith('--'));

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8')).phones;
for (const slug of only) {
  if (!manifest[slug]) throw new Error(`${slug}: not in scripts/phone-images.json`);
}
const slugs = only.length ? only : Object.keys(manifest);
await mkdir(CACHE, { recursive: true });

const results = [];
for (const slug of slugs) {
  const entry = manifest[slug];
  if (!entry.url && !entry.file) {
    console.log(`– ${slug}: no source yet${entry.note ? ` (${entry.note})` : ''}`);
    continue;
  }
  const jsonPath = path.join(PHONES, `${slug}.json`);
  if (!existsSync(jsonPath)) {
    results.push({ slug, error: 'no phone with this slug in src/content/phones' });
    continue;
  }
  try {
    const source = await loadSource(entry);
    const { output, warnings, sourceSize } = await normalise(source, entry);
    await writeFile(path.join(ASSETS, `${slug}.webp`), output);
    const phone = JSON.parse(await readFile(jsonPath, 'utf8'));
    await writeFile(jsonPath, JSON.stringify(withImage(phone, slug, entry), null, 2) + '\n');
    results.push({ slug, name: phone.name, entry, warnings, sourceSize, kb: Math.round(output.length / 1024) });
    console.log(`✓ ${slug}${warnings.length ? `  ⚠ ${warnings.join('; ')}` : ''}`);
  } catch (err) {
    results.push({ slug, entry, error: err.message });
    console.log(`✗ ${slug}: ${err.message}`);
  }
}

await writeReview(results);
const failed = results.filter((r) => r.error).length;
const warned = results.filter((r) => r.warnings?.length).length;
console.log(`\n${results.length - failed} images written, ${warned} with warnings, ${failed} failed.`);
console.log(`Review sheet: ${path.relative(ROOT, path.join(CACHE, 'review.html'))}`);
await reportCoverage();
if (failed) process.exitCode = 1;

/** Downloads (once, cached by URL) or reads the source image. */
async function loadSource(entry) {
  if (entry.file) return readFile(path.resolve(ROOT, entry.file));
  if (!entry.url) throw new Error('needs "url" or "file"');
  const cached = path.join(CACHE, 'src-' + createHash('sha1').update(entry.url).digest('hex').slice(0, 16));
  if (!refresh && existsSync(cached)) return readFile(cached);
  const res = await fetch(entry.url, {
    headers: { 'user-agent': 'Mozilla/5.0 (Macintosh) intrinsicallysafephones.com image importer', accept: 'image/*' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  const type = res.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) throw new Error(`download is ${type || 'unknown type'}, not an image`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(cached, buf);
  return buf;
}

/** Background out, trim to the device, fit into the standard canvas. */
async function normalise(input, entry) {
  const warnings = [];
  let img = sharp(input, { failOn: 'error' }).rotate(); // apply EXIF orientation
  if (entry.crop) {
    const [left, top, width, height] = entry.crop;
    img = sharp(await img.extract({ left, top, width, height }).toBuffer());
  }
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  const border = borderPixels(w, h);
  const transparentEdges = border.filter((i) => data[i * 4 + 3] < 16).length / border.length;
  if (transparentEdges < UNIFORM_BORDER) {
    const bg = medianColour(data, border);
    const matching = border.filter((i) => distance(data, i, bg) <= BG_TOLERANCE).length / border.length;
    if (matching < UNIFORM_BORDER) {
      throw new Error(
        `background isn't plain (${Math.round(matching * 100)}% of the edge matches); pick a packshot or add "crop"`,
      );
    }
    removeBackground(data, w, h, bg, border);
  }
  const dropped = keepLargestObject(data, w, h);
  if (dropped > 0.25) warnings.push('removed a second large object (front+back pair?); check the right one was kept');
  else if (dropped > 0.01) warnings.push('removed detached badges/text/shadow');

  const box = deviceBox(data, w, h);
  if (!box) throw new Error('nothing left after removing the background');
  const longest = Math.max(box.width, box.height);
  if (longest < MIN_SOURCE) warnings.push(`low resolution (${box.width}×${box.height} px device, upscaled)`);
  if (box.width > box.height) warnings.push('wider than tall: front+back pair or angled shot? Check it, maybe add "crop"');

  const device = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract(box)
    .resize({ [box.width >= box.height ? 'width' : 'height']: DEVICE, kernel: 'lanczos3' })
    .png()
    .toBuffer({ resolveWithObject: true });

  const output = await sharp({
    create: { width: CANVAS, height: CANVAS, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      {
        input: device.data,
        left: Math.round((CANVAS - device.info.width) / 2),
        top: Math.round((CANVAS - device.info.height) / 2),
      },
    ])
    .webp({ quality: 86, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toBuffer();

  return { output, warnings, sourceSize: `${box.width}×${box.height}` };
}

function borderPixels(w, h) {
  const out = [];
  for (let x = 0; x < w; x++) out.push(x, (h - 1) * w + x);
  for (let y = 1; y < h - 1; y++) out.push(y * w, y * w + w - 1);
  return out;
}

function medianColour(data, pixels) {
  return [0, 1, 2].map((c) => {
    const values = pixels.map((i) => data[i * 4 + c]).sort((a, b) => a - b);
    return values[values.length >> 1];
  });
}

function distance(data, i, bg) {
  const o = i * 4;
  return Math.max(Math.abs(data[o] - bg[0]), Math.abs(data[o + 1] - bg[1]), Math.abs(data[o + 2] - bg[2]));
}

/**
 * Flood fill from the edges: background-coloured pixels connected to the border become transparent,
 * near-background pixels on the way fade out with their colour un-mixed from the background, so
 * there's no white fringe on coloured cards. Enclosed white areas (a white screen) are untouched.
 */
function removeBackground(data, w, h, bg, border) {
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (const i of border) {
    if (!seen[i] && distance(data, i, bg) <= BG_EDGE) {
      seen[i] = 1;
      stack.push(i);
    }
  }
  while (stack.length) {
    const i = stack.pop();
    const d = distance(data, i, bg);
    const o = i * 4;
    if (d <= BG_TOLERANCE) {
      data[o + 3] = 0;
    } else {
      const a = (d - BG_TOLERANCE) / (BG_EDGE - BG_TOLERANCE);
      for (let c = 0; c < 3; c++) data[o + c] = clamp((data[o + c] - bg[c] * (1 - a)) / a);
      data[o + 3] = Math.round(data[o + 3] * a);
      continue; // edge pixel: don't spread past it into the device
    }
    const x = i % w;
    const y = (i - x) / w;
    for (const n of [x > 0 && i - 1, x < w - 1 && i + 1, y > 0 && i - w, y < h - 1 && i + w]) {
      if (n !== false && !seen[n] && distance(data, n, bg) <= BG_EDGE) {
        seen[n] = 1;
        stack.push(n);
      }
    }
  }
}

function clamp(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}

/**
 * Keeps only the largest connected shape (the device) and clears everything detached from it:
 * award badges, "5G" labels, logos, floor shadows. Returns the cleared area relative to the device's.
 */
function keepLargestObject(data, w, h) {
  const label = new Int32Array(w * h);
  const sizes = [0];
  for (let start = 0; start < w * h; start++) {
    if (label[start] || data[start * 4 + 3] === 0) continue;
    const id = sizes.length;
    let size = 0;
    const stack = [start];
    label[start] = id;
    while (stack.length) {
      const i = stack.pop();
      size++;
      const x = i % w;
      const y = (i - x) / w;
      for (const n of [x > 0 && i - 1, x < w - 1 && i + 1, y > 0 && i - w, y < h - 1 && i + w]) {
        if (n !== false && !label[n] && data[n * 4 + 3] > 0) {
          label[n] = id;
          stack.push(n);
        }
      }
    }
    sizes.push(size);
  }
  const keep = sizes.indexOf(Math.max(...sizes));
  let cleared = 0;
  for (let i = 0; i < w * h; i++) {
    if (label[i] && label[i] !== keep) {
      data[i * 4 + 3] = 0;
      cleared++;
    }
  }
  return keep ? cleared / sizes[keep] : 0;
}

/** Bounding box of the device: rows and columns with a few clearly visible pixels (ignores stray specks). */
function deviceBox(data, w, h) {
  const rows = new Uint32Array(h);
  const cols = new Uint32Array(w);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 32) {
        rows[y]++;
        cols[x]++;
      }
    }
  }
  const minRow = Math.max(2, w * 0.005);
  const minCol = Math.max(2, h * 0.005);
  const top = rows.findIndex((n) => n >= minRow);
  const left = cols.findIndex((n) => n >= minCol);
  if (top < 0 || left < 0) return null;
  const bottom = h - 1 - [...rows].reverse().findIndex((n) => n >= minRow);
  const right = w - 1 - [...cols].reverse().findIndex((n) => n >= minCol);
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

/** Sets image and imageAlt, placed after "summary" like the import does. */
function withImage(phone, slug, entry) {
  const out = {};
  for (const [key, value] of Object.entries(phone)) {
    if (key === 'image' || key === 'imageAlt') continue;
    out[key] = value;
    if (key === 'summary') {
      out.image = `../../assets/phones/${slug}.webp`;
      out.imageAlt = entry.alt ?? `${phone.name}, front view`;
    }
  }
  return out;
}

async function writeReview(rows) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
  const cards = rows
    .map((r) => {
      const img = r.error
        ? `<div class="err">${esc(r.error)}</div>`
        : `<img src="../../src/assets/phones/${r.slug}.webp?${Date.now()}" alt="">`;
      const src = r.entry?.sourcePage ?? r.entry?.url ?? r.entry?.file ?? '';
      return `<figure class="${r.error ? 'bad' : r.warnings?.length ? 'warn' : ''}">
  <div class="media">${img}</div>
  <figcaption><b>${esc(r.name ?? r.slug)}</b><br><code>${esc(r.slug)}</code>${r.sourceSize ? ` · device ${r.sourceSize} px · ${r.kb} KB` : ''}
  ${(r.warnings ?? []).map((w) => `<br>⚠ ${esc(w)}`).join('')}
  ${src ? `<br><a href="${esc(src)}">source</a>` : ''}</figcaption>
</figure>`;
    })
    .join('\n');
  await writeFile(
    path.join(CACHE, 'review.html'),
    `<!doctype html><meta charset="utf-8"><title>Phone images review</title>
<style>
  body { font: 14px/1.4 system-ui, sans-serif; margin: 24px; background: #faf8f4; color: #222; }
  main { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
  figure { margin: 0; background: #fff; border: 1px solid #e4e0d8; border-radius: 8px; overflow: hidden; }
  figure.warn { border-color: #d9a300; } figure.bad { border-color: #c0392b; }
  .media { position: relative; aspect-ratio: 4 / 3; border-bottom: 1px solid #e4e0d8;
    background: repeating-conic-gradient(#fff 0 25%, #f4f4f4 0 50%) 0 0 / 16px 16px; }
  .media img { position: absolute; inset: 1rem; width: calc(100% - 2rem); height: calc(100% - 2rem); object-fit: contain; }
  .err { padding: 1rem; color: #c0392b; }
  figcaption { padding: 10px 12px; } code { font-size: 12px; color: #666; }
</style>
<h1>Phone images (${rows.length})</h1>
<p>Same 4:3 frame as the Find phones cards. The checkerboard shows transparency. Yellow border = warning, red = failed.</p>
<main>
${cards}
</main>
`,
  );
}

/** Lists phones still without an image and image files no phone uses. */
async function reportCoverage() {
  const used = new Set();
  const missing = [];
  for (const f of (await readdir(PHONES)).filter((f) => f.endsWith('.json'))) {
    const phone = JSON.parse(await readFile(path.join(PHONES, f), 'utf8'));
    if (phone.image) used.add(path.basename(phone.image));
    else missing.push(f.slice(0, -5));
  }
  const unused = (await readdir(ASSETS)).filter((f) => !f.startsWith('.') && !used.has(f));
  if (missing.length) console.log(`\nNo image yet (${missing.length}): ${missing.join(', ')}`);
  if (unused.length) console.log(`Not used by any phone: ${unused.map((f) => `src/assets/phones/${f}`).join(', ')}`);
}
