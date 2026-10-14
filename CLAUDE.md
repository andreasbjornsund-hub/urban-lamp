# intrinsicallysafephones.com

Read this first. It holds the decisions and rules behind the code; DESIGN.md covers the legacy pages.

## The project

- **Goal:** the best resource online for researching and comparing intrinsically safe and explosion-proof
  phones for Zone 1 and 2. Highly SEO-optimised: rank for brand/model questions, "X vs Y" comparisons and
  "best phone for <use case>" searches.
- **Commercial context:** Xshielder sponsors the site. Comparisons must stay fair; Xshielder is promoted
  through structure (use-case pages where it genuinely wins, alternatives pages, a labelled sponsor slot),
  never by bending facts, scores or wording.
- **People:** the repo belongs to Andreas (andreasbjornsund-hub/urban-lamp). Rory is running the revamp on the
  `astro-revamp` branch. Andreas signs off before anything merges to `main`.
- **Languages:** English first. German (`/de/`) and Dutch (`/nl/`) exist only as legacy pages for now and will
  be translated later.

## Stack and layout

- Astro 7, fully static. New pages in `src/pages/`. The legacy site sits untouched in `public/` and is copied
  into the build, so its `.html` URLs keep working until each page is rebuilt and redirected.
- Hosting: GitHub Pages, behind Cloudflare. Real 301 redirects and response headers (caching, security) are
  set in Cloudflare, not in the repo.
- Deploy: `.github/workflows/deploy.yml` builds on push to `main`, deploys, then purges Cloudflare.
- **Before merging to `main`, Andreas must switch Settings → Pages → Source to "GitHub Actions".** Pages
  currently publishes the repo root, which no longer has an `index.html`; merging first breaks the live site.

```bash
npm run dev            # dev server (daemonises; `npx astro dev stop` to stop). Restart after changing src/content.config.ts
npm run build          # full site into dist/
npm run preview        # serves dist/ like GitHub Pages
npm run og:image       # re-render public/og-image.png from scripts/og-image.html (headless Chrome)
npm run phones:import -- /path/to/IS_phones_master_data.xlsx   # regenerate src/content/phones/ (needs openpyxl)
npm run phones:images  # download + normalise product photos from scripts/phone-images.json (add slugs to limit)
npm run legacy:chrome  # legacy pages only: header/footer rebuild (see DESIGN.md)
npm run legacy:css     # legacy pages only: Tailwind rebuild
npm run legacy:links   # legacy pages only: HAG link policy
```

## Site architecture (agreed plan)

Nav: `Best for ▾ | Compare | Guides ▾ | About | [Find phones]` — defined in `src/config/site.ts`.

| Section | URL | Status |
|---|---|---|
| Home | `/` | Built |
| Find phones (filter + compare) | `/phones/` | Built |
| Phone pages | `/phones/{slug}/` | Built (48 phones from the master data workbook) |
| Head-to-head | `/compare/{a}-vs-{b}/` (slugs sorted) | Not built; only for the most popular pairs |
| Alternatives | `/alternatives/{slug}/` | Not built |
| Best for (zone / industry / need) | `/best/{slug}/` | Not built; slugs in `site.ts` |
| Brands | `/brands/{slug}/` (footer, not nav) | Not built |
| Guides | `/guides/{slug}/` | Not built; two legacy articles are linked from the Guides menu |
| About, How we rate, Disclosure, Contact, Terms, Cookies | `/about/` etc. | Not built |

Most nav and footer links point at pages that don't exist yet. `/contact/` matters most: legacy pages' price
links (`/?inquire=…#contact`) relied on the old homepage form, which is gone.

## Design system (`src/styles/global.css`)

- **Colours:** warm paper `#faf8f4` page; full-width section bands in white `#fff` and warm off-white `#f5f3f0`;
  forest green `#1e3a2f` for buttons and the CTA band; logo green `#114634`. All text passes WCAG AA.
- **Texture:** the 3px dot grain and amber/green glows (from the old homepage) appear in heroes only.
- **Type:** Libre Franklin (headings, 600) + Inter (body), self-hosted via Astro's font API in `astro.config.mjs`.
  Heading tracking is tokenised (`--tracking-hero/-display/-heading`).
- **Layout:** full-width bands (`.band`, `.band-white`, `.band-warm`), content at container width. Sticky
  translucent header. Mobile-first; 44px tap targets.
- **Logo:** inline SVG phone mark + "**intrinsicallysafephones**.com" wordmark + "ATEX Zone 1 & 2 Devices Compared"
  (`src/components/Logo.astro`). Brand name for schema: "Intrinsically Safe Phones".

## Phone data rules (`src/content/phones/*.json`, schema in `src/content.config.ts`)

- **Source of truth: the master data workbook** (`IS_phones_master_data.xlsx`, fact-checked 2026-10-13). It is
  kept outside this public repo because it holds review notes and prices. `scripts/import_phones.py` turns it
  into one JSON file per phone (the filename is the URL slug); pages, filters, comparisons and JSON-LD all come
  from that. Change the workbook or the import rules, then re-run the import; don't hand-edit the JSON. Only
  `image` and `imageAlt` are added by hand, and the import keeps them.
- **What gets a page:** every certified product, current or discontinued (discontinued pages carry a notice and
  a successor link; Find phones hides them unless "Include discontinued" is ticked). Announced products are left
  out until certified (the Atexxo Zone 1 Galaxy S26 and XCover7 Pro, expected Q1 2027). Mining versions, the
  Nokia-branded IS540.1 and the SP9EX1 Cam version are listed as variants on their parent page (`FOLD`), so
  there are no near-identical pages. New workbook rows must be mapped in `PRODUCTS` or the import stops.
- **Flagged cells:** NOT FOUND is never published. CHECK and CONFLICT values are published with a public note
  (`NOTES`/`STATUS` in the script), shown as a numbered "Unconfirmed" marker that links to the note at the foot
  of the page. The import stops if a published flagged cell has no note, so researcher comments never reach the
  site. Uncertain temperature classes are left out of badges and filters. Unknown is shown as "not verified",
  never as "no".
- Summaries, strengths, limitations, alternatives and best-for tags are generated by the same rules for every
  brand (fairness). Wording stays neutral and factual (e.g. "T4: fine for most gases, but not those that
  ignite below 135 °C", not "T6 options exist"). Flameproof (Ex db) cases are never called intrinsically safe.
- Field-worker features: derived from specs where possible (`derive` in `FEATURE_GROUPS`), otherwise set by the
  import in `"features"` (e.g. whether a camera or key works through a case). Keys live in
  `src/lib/feature-keys.ts`. Features with no verified data anywhere are shown on the dev server only.
- `"sponsor": true` (Xshielder) shows a labelled Sponsor disclosure on its phone pages (not on Find phones
  cards; the footer sponsor line covers the grid). Prices are always
  "on request", even though the workbook has indicative prices.
- Legacy pages, `public/llms-full.txt` and `reasoning.json` still carry the older data and need updating from
  the workbook.
- **Images:** every phone photo goes through `npm run phones:images` so the grid looks uniform: sources are
  listed in `scripts/phone-images.json` (official packshot URL + source page per slug; front-on, plain
  background, one device). The script removes the background, drops detached badges/text/shadows, trims to the
  device, scales it to 1080 px tall and centres it on a transparent 1200×1200 WebP at
  `src/assets/phones/<slug>.webp`, then sets `image`/`imageAlt` in the phone's JSON. It refuses busy/lifestyle
  backgrounds and warns on low resolution or wide (front+back) shots; check `.cache/phone-images/review.html`
  after each run. Don't hand-place images in `src/assets/phones/`; add a manifest entry (`file` for a local
  photo, `crop` to cut one device out of a multi-device shot).
- Not verified by any maker: NFC and satellite features through metal Ex enclosures.
- Apple security updates are shown as "7+ years (based on previous model support)" (`os.supportYears`, set by the
  import for every `B-AP-*` base). The workbook holds Apple's 5-year legal minimum; the import adds 2 years to
  that date so sorting and the "updates to 2030+" filter match.

## HAG network link policy (`src/lib/links.ts`)

Use `externalLink(url, pageSlug(...))` for every outbound link: xshielder.com gets `rel="sponsored"` plus UTM
tags; competitors (list mirrors `scripts/hag_link_policy.py` and `public/assets/hag-links.js`) get
`rel="nofollow"`. The footer carries the network sponsor line and every page loads `/assets/hag-links.js`.

## Built features worth knowing

- **Find phones** (`src/pages/phones/index.astro`): sticky filter bar with two dropdowns, "Ex rating"
  (zones, Division, gas group, temperature class, ATEX/IECEx/UKEX, mining version; protection method last and
  deliberately low priority) and "Features" (availability, OS, device type, phone type, brand, weight, then
  field-worker features). Requirements check: phones failing the Ex rating filters are hidden, or shown dimmed
  with a reason per requirement. Filter state is in the URL. Cards show only brand (plus its logo
  top-right, from `src/lib/brand-logos.ts`), model, zones, certification, OS,
  weight, plus a Discontinued tag. The photo area has a radial glow and the phone lifts on hover. `CARD_THEME`
  in the page picks light (warm white, black logos) or dark (forest green, white logos; Xshielder's own yellow
  logo via `ON_DARK` in `PhoneCard.astro`); `?cards=light|dark` overrides it in the browser for review.
- **Compare tray** (`src/components/phone/CompareTray.astro`): site-wide, up to 4 phones, collapsed bar that
  expands on demand. Any `[data-compare-add="<slug>"]` button works. Selection in localStorage; data
  lazy-loaded from `/compare-data.json`. Users can hide the bar to a small "Compare (n)" tab in the corner
  (inline button on desktop, pull-tab on the bar's top edge on phones); that choice is remembered across pages
  and resets when the selection is cleared.
- **Phone pages** (`src/pages/phones/[slug].astro`): availability notice, zone coverage grid, Ex marking decoder,
  versions, "Safe use" (ambient temperature, charging and battery swap rules, the certificate's conditions of
  use), grouped specs incl. what works through the case and field capabilities, closest-alternatives table,
  generated FAQ, notes on unconfirmed values, sources. Product/WebPage/Breadcrumb/FAQ JSON-LD.
  The marking decoder (`MarkingTabs` → `MarkingDecoder`) puts ATEX and IECEx in tabs when a phone has both,
  and splits each marking into labelled gas / dust / mining blocks (atmosphere and zones come from the EPL).
  Codes already explained in an earlier block are listed as "as above" instead of repeated.
- **Home hero strips** (`src/components/home/HeroMarquee.astro`): no box; three strips in alternating
  directions that fade out at the container edges (aligned with the header CTA): brand logos, certification
  marks, and real (confirmed) ATEX markings from the phone collection. Brands are alphabetical (fairness).
  Brand logos are single-colour black files at `src/assets/brands/<brandSlug>.{svg,png,webp}` (a brand without
  one falls back to typeset text); heights are balanced by aspect ratio plus an `OPTICAL` override. Sources
  (2026-10-14): each brand's own site header (ecom uses the Pepperl+Fuchs logo its site now shows; Xciel's
  taglines and swoosh are cropped off), Xshielder's black logo and all marks (Ex hexagon, CE, UKCA, yellow EX
  warning sign) from Wikimedia Commons. ATEX is shown as CE + Ex, UKEX as UKCA + Ex. `tone="colour"` (the
  default, used on the home page) prefers full-colour files in `colour/` subfolders: yellow Ex hexagon, the IECEx
  logo (supplied by Rory, shown in the colour version only; IECEx marks are normally licensed to certified
  products), colour Atexxo, P+F and i.safe logos, and outline marking pills (black text and border). The brand
  order stays alphabetical, but a small inline script starts the strip part-way along so the sponsor's logo (Xshielder) slides in about
  1 s after load (`SPONSOR`, `SPONSOR_DELAY_S`). In the colour version its yellow logo sits on a `#171B25`
  badge (`BADGE`); the logo is the brand kit SVG with `#FFED00` set as its fill (the kit file had lost its colour).
  `tone="mono"` is the all-black version. UL/CSA marks stay out, so Class/Division is text. On desktop the
  strips fill the square the old hero image took, so the hero keeps its height.
- `sitemap.xml` is generated (`src/pages/sitemap.xml.ts`): Astro pages plus legacy entries from
  `src/data/legacy-sitemap.xml`.

## Gotchas

- Astro's HTML compression drops the space between a line of text and a tag that starts the next line.
  Add `{' '}` at the end of the text line.
- `[hidden] { display: none !important }` is global so component `display` rules can't override it.
- A component's `<style>` is bundled whenever it's imported, even if not rendered. Use `<style is:inline>`
  for dev-only components.
- A `backdrop-filter` on a sticky bar traps `position: fixed` children (bottom sheets); the filter bar goes
  solid on mobile for this reason.
- `src/content.config.ts` must not import from `src/lib/phones.ts`: that file uses the collection's types, and
  the cycle turns every phone into `any`. Shared constants go in a type-free module like `feature-keys.ts`.
- A horizontal scroll container needs `position: relative`, or the absolutely positioned `.visually-hidden`
  labels inside it escape the clip and widen the page on mobile.

## Every page must have

Semantic HTML, mobile-first layout, accessible markup, JSON-LD schema, titles ≤ 60 and descriptions ≤ 160
characters, an entry in the generated sitemap, and robots.txt left pointing at `/sitemap.xml`.
