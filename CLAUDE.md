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
| Compare index | `/compare/` | Built (2026-10-15): lists every head-to-head, grouped by its `eyebrow`, plus a route to compare any phones (Find phones and the compare tray) |
| Head-to-head | `/compare/{a}-vs-{b}/` (slugs sorted) | Batch 1 built (12 pairs of brand flagships, 2026-10-15). The other 32 flagship pairs are planned for later batches |
| Alternatives | `/alternatives/{slug}/` | Not built |
| Best for (zone / industry / need) | `/best/{slug}/` | All 16 slugs in `site.ts` built ("Budget" became `long-term-value`, 2026-10-14). `/best/` index not built |
| Brands | `/brands/{slug}/` (footer, not nav) | Not built |
| Guides | `/guides/{slug}/` | Not built; two legacy articles are linked from the Guides menu |
| Disclosure | `/disclosure/` | Built (plain-language funding statement; Andreas to confirm the wording) |
| About, How we rate, Contact, Terms, Cookies | `/about/` etc. | Not built |

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
  a successor link; Find phones lists them, with a "Hide discontinued models" filter). Announced products are left
  out until certified (the Atexxo Zone 1 Galaxy S26 and XCover7 Pro, expected Q1 2027). Mining versions, the
  Nokia channel listing of the IS540.1 and the SP9EX1 Cam version are listed as variants on their parent page (`FOLD`), so
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
- `"sponsor": true` (Xshielder) is an internal flag: it gives the brand's pick on Best for pages a secondary
  "Request a price" link next to the primary "View full details" button. No "Sponsor" badges or per-page notes are shown (removed 2026-10-14, by decision).
  The relationship is disclosed once, in the footer line on every page and on `/disclosure/`, and Xshielder links
  keep `rel="sponsored"`. Don't add per-page sponsor labels back without checking with Andreas. Prices are always
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

- **Find phones** (`src/pages/phones/index.astro`): sticky filter bar labelled "Filters" with two dropdowns,
  "Ex rating" (zones, Division, gas group, temperature class, ATEX/IECEx/UKEX, mining version; protection method
  last and deliberately low priority) and "Features" (Device: OS, device type, phone type, weight bands; then
  must-have field-worker features; availability last). No brand filter. Three filter kinds (`need`/`any`/`all`
  in the page): zones, Division, gas group and temperature class are a single "what your site needs" choice
  (radios with "Any"); categories are checkboxes matching any ticked option; certificates and features are
  checkboxes needing all ticked. A 'need' choice includes phones with a higher rating (Zone 0 and 1 phones when
  Zone 2 is needed), since they can be used there too; cards say so ("Zone 1 rated, also covers Zone 2"). Under
  the chosen rating a small "Show Zone 2 phones only" checkbox (with an ⓘ tooltip; `exact` in the URL) narrows
  it to that rating, e.g. for people after cheaper Zone 2 phones. It resets when the rating changes and is
  hidden when nothing is rated higher. Phones that don't meet a requirement are hidden behind "Show them and
  why" and dimmed with a reason per requirement. Filter state is in the URL. Buttons and selects use the 6px radius,
  not pills. Cards show only brand (plus its logo
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
  strips span the h1 + lead (the copy's lines share grid rows with them): brands top-aligned with the h1, pills
  bottom-aligned with the lead, marks halfway between. An empty square grid
  item keeps the hero the height the old square image gave it.
- **Best for pages** (`src/pages/best/[slug].astro`): one file per page in `src/data/best/<slug>.ts` (filename = slug),
  collected by `src/data/best-pages.ts`, which documents every field; add a file to add a page (it joins the sitemap
  automatically). Besides the copy (lead, method, ranked `picks`, checklist, FAQ) each page sets its section
  headings, the `pool` predicate behind "Other … phones on sale" (hidden when empty), the Find phones link, the
  table columns (`glanceColumns`/`others.columns`, keys in `BestColumn`, values filled from the phone data by
  `COLUMNS` in the template), an optional `labelNote` ⓘ tooltip on every label (used on long-term-value, where
  labels are estimates because few makers publish prices) and the CTA: `kind: 'xshielder'` only where an Xshielder
  product is picked, otherwise `'neutral'` (impartial advice). Tables mark single-source values "(unconfirmed)" and
  word unconfirmed update dates as their source does ("Q4 2032 (maker’s statement)", "About … (estimate)"). Tables, markings, weights and update dates are read from the phone data, so only the
  "why" copy is hand-written and must be re-read against the workbook when it changes. That copy reads as an
  opinion piece grounded in the data: what the phone achieves for a team and which workflows it suits, with the
  key figures woven in and any trade-off that affects planning in the same prose. Labels name the work
  ("Best for scanning and data capture"). There are no "Watch out for" boxes (removed 2026-10-14, by decision).
  Every pick's primary button is "View full details", including the top card in the hero.
  Fairness rule: rank 1 must be decided by a criterion stated in the page's method text and visible in the data
  (Zone 1 page: gas coverage, where Xshielder's T6 is the only one among current Zone 1 phones; every other
  confirmed class is T4). Xshielder is rank 1 on 7 of 16 pages; oil-and-gas and offshore use capability criteria
  (inspection tools confirmed through the case on the widest gas and dust certificate) chosen by Rory on
  2026-10-14, with their limits stated in the copy, and need Andreas's sign-off. The three Xshielder cases are
  separate products, never described as siblings of one another. Positions below 1 are "best for X" winners, each with honest limits stated in the copy, and
  the method section links to `/disclosure/`. Xshielder is never called intrinsically safe. Remaining current phones in each page's pool are listed alphabetically (lightest first on `lightest`).
- **Head-to-head pages** (`src/pages/compare/[pair].astro`): one file per pair in `src/data/compare/<a>-vs-<b>.ts`
  (the two slugs sorted), collected by `src/data/compare-pages.ts`, which documents every field; only pairs with a file
  get a page, and the compare tray covers every other combination. Sections: matchup hero, verdict ("Choose the X if…"),
  key differences, "In the field" topics with an edge label (a phone or "Even"), full specifications side by side
  (with "Show differences only"), shared Best for pages, CTA, FAQ, numbered notes on unconfirmed values for both
  phones. Values come from the phone data: each difference names a spec row by its label and the build fails on an
  unknown label, a title over 60 or a description over 160 characters. The specification rows are shared with the
  phone pages through `src/lib/spec-groups.ts`. `CompareTable` shows "Full comparison" only for pairs with a page.
  Flagships agreed with Rory (2026-10-15): i.safe IS540.1 and IS440.1, ecom Smart-Ex 03 DZ1 and Smart-Ex 203,
  BARTEC SP9EX1 and SC9EX1, Xshielder iPhone 17 Pro Max and iPhone 17, Atexxo Zone 1 iPhone 17, Xciel XCiPhone 17.
  Never pair the Xshielder cases with each other (they are not siblings). Rory's rules from the pilot (2026-10-15):
  always use full names with the brand ("ecom Smart-Ex 03 DZ1", "i.safe MOBILE IS540.1"), in labels and copy, never
  the model alone; "Key differences" holds only the few points that decide the choice, sorted by importance, and niche
  points such as a UKEX certificate go last in a "Choose the X if…" list instead.
  Name order is alphabetical (the URL order). Pages with an Xshielder product use `cta.kind: 'xshielder'`; where an edge
  is arguable on such a page it goes to the competitor, and Xshielder's limits (IECEx for the S02 version only, no
  North American approval in our data, +50 °C, battery not replaceable, USB-C not accessible, no Camera Control, low
  impact energy) are stated where they matter. Workflow: Sonnet writes from a per-pair fact sheet, Opus fact-checks
  every claim, the main session does the fairness pass and builds. Briefs, the fact-sheet generator and the house-rule
  checker are in `../compare-tools/` (outside the repo; see its README).
- **Compare index** (`src/pages/compare/index.astro`): lists every page in `COMPARE_PAGES`, so a new file in
  `src/data/compare/` shows up there (and in the sitemap) with no other change. Groups come from each page's `eyebrow`
  minus the "Compare · " prefix, so keep eyebrows consistent across pages of the same kind. Neutral order: groups with
  the most comparisons first (alphabetical on a tie), pairs alphabetical within a group; never sponsor-first. A
  "Build your own" band lists every phone in a head-to-head (alphabetical) with an add-to-compare button for the tray;
  a phone without a photo shows its brand logo. The CTA is the neutral impartial-advice panel.
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
