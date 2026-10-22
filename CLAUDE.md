# intrinsicallysafephones.com

Read this first. It holds the decisions and rules behind the code; DESIGN.md covers the legacy pages.

## The project

- **Goal:** the best resource online for researching and comparing intrinsically safe and explosion-proof
  phones for Zone 1 and 2. Highly SEO-optimised: rank for brand/model questions, "X vs Y" comparisons and
  "best phone for <use case>" searches.
- **Commercial context:** Xshielder sponsors the site. Comparisons must stay fair; Xshielder is promoted
  through structure (use-case pages where it genuinely wins, alternatives pages, a labelled sponsor slot),
  never by bending facts, scores or wording.
- **People:** the repo belongs to Andreas (andreasbjornsund-hub/urban-lamp). Rory ran the revamp on the
  `astro-revamp` branch and took it live on 2026-10-21 (merged to `main`; Rory confirmed Andreas's sign-off wasn't needed).
- **Languages:** English first. German (`/de/`) and Dutch (`/nl/`) exist only as legacy pages for now and will
  be translated later.

## Stack and layout

- Astro 7, fully static. New pages in `src/pages/`. Only the legacy German (`/de/`), Dutch (`/nl/`) and privacy pages
  are still served from `public/`. The old English pages were taken off the site at launch (2026-10-21) and kept as drafts in
  `legacy/` (not built; see `legacy/README.md`). Each old URL now serves a small redirect page from `public/` (meta refresh
  plus canonical) to its closest new page, until real 301s are set in Cloudflare.
- Hosting: GitHub Pages, behind Cloudflare. Real 301 redirects and response headers (caching, security) are
  set in Cloudflare, not in the repo.
- Deploy: `.github/workflows/deploy.yml` builds on push to `main`, deploys, then purges Cloudflare.
- Settings → Pages → Source is "GitHub Actions" (switched 2026-10-21 at launch).

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
| Compare index | `/compare/` | Built (2026-10-15), redesigned 2026-10-20: a two-phone picker with a teaser of the head-to-head, plus every head-to-head as plain links grouped by phone |
| Head-to-head | `/compare/{a}-vs-{b}/` (slugs sorted) | All 44 flagship pairs plus ecom Smart-Ex 03 DZ2 vs Smart-Ex 203 built (45 pages, 2026-10-15 to 2026-10-20), with the `/compare/` hub. Five Xciel pages still need the Opus fact-check (see the compare section) |
| Alternatives | `/alternatives/{slug}/` | Not built |
| Best for (zone / industry / need) | `/best/{slug}/` | All 16 slugs in `site.ts` built ("Budget" became `long-term-value`, 2026-10-14). No `/best/` index, by decision (Rory, 2026-10-21): nothing links to it and breadcrumbs go Home / page |
| Brands | `/brands/{slug}/` | Not built; the footer link and the brand link on phone pages were removed at launch |
| Guides | `/guides/{slug}/` | Template and five pages built (the `/guides/` index was removed 2026-10-21 by Rory's decision; the Guides menu lists them) 2026-10-21: rugged vs intrinsically safe, phone cost with calculator, Android vs iPhone (replaces the legacy iPhone Ex case article, which now redirects here), replacing discontinued phones, and the FAQ (`/guides/faq/`, `faqInBody`). Not yet signed off: the cost guide publishes reseller prices, which needs Andreas's OK. The legacy "What is an intrinsically safe phone?" article was taken out of the Guides menu 2026-10-21 (Rory); its URL now redirects to `/guides/faq/` |
| Disclosure | `/disclosure/` | Built (plain-language funding statement; Andreas to confirm the wording) |
| About, How we rate, Terms, Cookies | `/about/` etc. | Built at launch (2026-10-21) on `src/components/InfoPage.astro`; short versions written from the privacy notice, disclosure and these rules. Keep `/cookies/` in step with `public/privacy.html`. About has only "Why we created this site" and "Get in touch" (Rory removed who runs it and funding, 2026-10-21) |
| Contact | `/contact/` | Built at launch. Same Web3Forms set-up as the legacy home page form (access key, subject "intrinsicallysafephones.com enquiry", sender name, fields name/email/company/message/page, `_honey` spam trap, same messages), so enquiries arrive unchanged. `?phone=<slug>` and legacy `?inquire=` pre-fill the message; the home page forwards `/#contact` and `/?inquire=…` here |

`public/llms.txt` was rewritten at launch to point at the new pages; the old `llms-full.txt` and `reasoning.json` are in `legacy/`.
The footer newsletter box emails the same inbox through Web3Forms ("Newsletter signup"); there is no mailing list behind it,
and the privacy notice does not mention it yet.

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
- The legacy German and Dutch pages still carry the older data.
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
- Makers that state the end of security updates as a quarter (ecom, i.safe MOBILE; `SECURITY_QUARTERS` in the import)
  are quoted that way ("Until Q4 2032", `os.securityUntilLabel`); the workbook holds the quarter's last day for sorting,
  filters and the cost calculator. A date in the past reads "Ended Q3 2025". Checked on the makers' pages 2026-10-21.

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
- **Home page** (`src/pages/index.astro`, reworked with Rory 2026-10-20): kept short and low on text, with no side text
  beside headings, and no eyebrows anywhere on the page (Rory, 2026-10-21), except the hero's H1: "Intrinsically safe phones
  compared" is the page's real `<h1>` (the search term) styled as an eyebrow, and the slogan "The right phone. For the right
  environment." below it is a `<p class="hero-slogan">` styled as the headline (Rory, 2026-10-22). Hero (layout unchanged; second button
  "Compare phones"), then "Start your search here." (centred heading and line, Best for links behind three centred
  button-style tabs: Zone, Industry, Use case; WAI-ARIA tabs, every panel in the HTML and shown without JS), each a
  hand-drawn picture (`src/assets/home/tab-{zone,industry,use-case}.webp`, supplied by Rory 2026-10-21) beside a
  two-column list of Best for links whose text comes from each page's h1. On desktop screens at least 40rem tall every
  section band except the CTA is at least 620px tall (a MacBook view with the dock), content centred, and the
  type tokens, buttons, tiles and images inside are a step larger so the bands don't look sparse. Then brands
  (copy left, logos right in their own colours, black where there's no colour file, Xshielder's yellow logo on its
  dark badge as in the hero; alphabetical), one head-to-head visual (two unboxed, unnamed phone photos in portrait frames with
  a plain green "vs" between, linking to ecom Smart-Ex 03 DZ1 vs i.safe MOBILE IS540.1; the build fails if it holds a
  sponsor product; the button "Compare phones" goes to `/compare/`), "Facts first" (three principles, no funding copy), guides (three real guides, each with its own photo), FAQ (FAQPage JSON-LD; eleven standalone questions, reworked 2026-10-21, the funding question removed by Rory; the build fails if the counts, brand groups, Zone 1 Android update dates or the "only Xshielder is T6 in Zone 1" claim stop matching the data. The cost answer repeats the cost guide's reseller price ranges, so it falls under the same pending sign-off from Andreas), CTA. Counts come from
  the data; the build fails on a missing Best for or compare slug or an over-long title/description. The photos are
  low-resolution mockup crops.
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
  strips span the slogan + lead (the copy's lines share grid rows with them; the eyebrow H1 sits in the row above): brands top-aligned with the slogan, pills
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
  phone pages through `src/lib/spec-groups.ts`, and merged for two phones in `src/lib/compare-rows.ts`. `CompareTable` shows "Full comparison" only for pairs with a page.
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
  Eyebrows are fixed groups so the pages stay consistent: `python3 ../compare-tools/eyebrows.py src/data/compare` sets
  each page's eyebrow from its two phones (Zone 1 Android phones; Push-to-talk phones for Zone 1; Android phones for
  Zone 2; iPhone or Android for Zone 1; iPhone or Android for Zone 2 and Division 2; iPhone cases and conversions). Run it
  after adding pages. Not yet Opus fact-checked (editor pass only): bartec-sc9ex1, bartec-sp9ex1, ecom-smart-ex-03-dz1
  and isafe-is540-1 vs xciel-xciphone-17, and xciel-xciphone-17 vs xshielder-iphone-17-pro-max.
- **Compare index** (`src/pages/compare/index.astro`, redesigned with Rory 2026-10-20): a picker of two phones
  ("Phone" / "Compared with") with a teaser of their head-to-head: the first verdict paragraph, the first four key
  differences with their values, the first "Choose the X if…" reason for each phone, and "Read the full comparison".
  Only phones in a head-to-head can be picked, and the second list holds only phones with a page against the first
  (a choice that still has a page is kept when the first phone changes). Teaser columns follow the picker order; the
  heading is the page's h1. The default pair (`DEFAULT_PAIR`: ecom Smart-Ex 03 DZ1 vs i.safe MOBILE IS540.1) is
  server-rendered and must not include a sponsor product (the build checks); other teasers come from
  `/compare-teasers.json` (`src/pages/compare-teasers.json.ts`, built by `src/lib/compare-teaser.ts`), fetched when a
  visitor reaches for the picker. The choice goes in the URL (`?a=…&b=…`); the canonical stays `/compare/`. The two
  phones stand large and unboxed on the hero (a glow behind, a shadow under, a "vs" badge between; Rory 2026-10-20), each
  with a "Change phone" button that opens a menu showing every option with its photo thumbnail and zones: a popover
  listbox (keyboard: arrows, Home/End, type-ahead, Enter, Escape) placed under the button on wider screens and a
  bottom sheet on phones. Photos are generated at 640 px for the stage and 128 px for the menus. Values come from `src/lib/compare-rows.ts`, the same merged
  specification rows the head-to-head pages use. Below, "All N head-to-head comparisons" lists every page as a plain
  link in a collapsed `<details>`, grouped by phone (each pair appears under both phones), so every page stays linked
  without JavaScript. Phones are alphabetical everywhere; eyebrows are no longer used on the hub. One line points to
  Find phones and the compare bar for unpaired phones. The CTA is the neutral impartial-advice panel. Elements the
  script re-renders lose Astro's scope attribute, so their styles use `:global()`.
- **Guides** (`src/pages/guides/[slug].astro`, index at `src/pages/guides/index.astro`): one file per guide in
  `src/data/guides/<slug>.ts`, collected by `src/data/guide-pages.ts` (fields documented there; title/description lengths
  checked). Copy is written outside the repo (`../guides/*.html`, HubSpot-style) and pasted in word for word: `lead` is the
  first paragraph, `body` the HTML up to the closing call to action, `cta` the last section before the FAQ (rendered in
  the forest CTA band; guides use `kind: 'neutral'` only, no Xshielder or iPhone CTAs, Rory 2026-10-21), `faq` the h4/p pairs (FAQPage JSON-LD). The FAQ page sets `faqInBody`: its categorised h3/p questions stay in the body, `faq` holds them as plain text for the JSON-LD only, the foot accordion is skipped, and it sorts last in the menu. `src/lib/guide-html.ts` applies the HAG link policy to
  outbound links, gives h2s ids, wraps tables in a labelled scroll box, and fails the build on a link to a missing
  `/phones/`, `/best/`, `/compare/` or `/guides/` page. Article + Breadcrumb + FAQPage JSON-LD. Layout (Rory, 2026-10-21): the hero is centred, the copy sits in a centred 46rem column, and an "On this page" list of every h2/h3/h4 (ids from `guide-html.ts`, unique across the page) sits in the left column, sticky, bolding the heading in view and its h2 as the reader scrolls. When the screen is too narrow for equal side columns the right one gives way, so the copy moves right; below 64rem the list is a collapsed box above the copy. The Guides menu and
  the home page's three guide cards (`insights`, by slug; the build fails on a missing guide or photo) use `GUIDE_PAGES` (`navLabel`). Each guide has two or three photos in `src/assets/guides/` (16:9, 1200 × 675, supplied by Rory 2026-10-21), listed with alt text per guide in `src/lib/guide-images.ts`. The first is the main photo: the home card, and the guide page's Open Graph and Article image (cropped to 1200 × 630). The template spaces all of them through the body, each before the h2 nearest an even split (two photos at a third and two thirds). `<!-- CALCULATOR -->` in a body
  renders `src/components/guides/CostCalculator.astro`, a single-phone estimator (simplified with Rory 2026-10-21; no
  side-by-side comparison): a phone chooser, a currency chooser and three pre-filled, editable fields (price, service life,
  resale), giving the cost per year and over the service life, plus "How we worked this out" bullets for each figure.
  Reseller list price ranges are hard-coded there (from `../price-research-2026-10-20.md`); the price starts at the middle
  of the range (Android) or the entry storage (iPhones). A market with no list price gets a build-time estimate (the
  phone's range in another market × the median ratio between those markets for the same brand, else every preset).
  Service life runs to `os.securityUntil` (worded with `os.securityUntilLabel` when the maker gives a quarter; Apple dates
  are estimates via `os.supportYears`). Resale is £125 (£100–150, `RESALE_GBP`) only for iPhones in a removable Ex case
  (`type: 'ex-case'`, not case-only), never for conversions or dedicated phones. A "worth considering" camera note shows
  for Pro iPhones with `camera-48mp` in the data (the camera can replace a separate Ex camera). Switching currency
  converts edited amounts at ECB rates for 20 October 2026 (`RATES`). These prices are an exception to "prices on
  request" pending Andreas.
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

Title wording (SEO sweep with Rory, 2026-10-22): every Best for title contains "Intrinsically Safe". Where a page's
picks include anything that isn't Ex i (Xshielder or Atexxo Zone 1 flameproof cases, Atexxo Ex ec ic conversions) it is
paired as "Intrinsically Safe & Ex-Proof", so Xshielder is never called intrinsically safe. Phone page titles and
descriptions are generated in `src/pages/phones/[slug].astro` from the certified protection: Ex i → "Intrinsically Safe",
flameproof → "Explosion-Proof", anything else (or an unconfirmed marking) → the scheme ("ATEX"). Descriptions pick the
longest version that fits 155 characters instead of being cut off.
