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
| Phone pages | `/phones/{slug}/` | Built (template, 7 phones) |
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

- One JSON file per phone; the filename is the URL slug. Pages, filters, comparisons and JSON-LD all come
  from this data.
- **Only compliance-verified facts.** Source of truth today: `public/llms-full.txt`. Leave a field out
  rather than guess. Unknown is shown as "not verified", never as "no".
- Field-worker features: derived from specs where possible, otherwise listed in `"features"` (keys
  validated against `FEATURE_GROUPS` in `src/lib/phones.ts`). Features with no verified data anywhere are
  shown on the dev server only.
- Strengths/limitations must be neutral and factual (e.g. "T4: fine for most gases, but not those that
  ignite below 135 °C", not "T6 options exist").
- `"sponsor": true` (Xshielder) shows a labelled Sponsor disclosure on cards and pages. Prices are always
  "on request".
- The catalogue is being expanded separately. Known conflicts between the old homepage data and
  `llms-full.txt` (i.safe Android version, Xciel and Atexxo markings, Atexxo IECEx) must be settled there.
  Bartec and Xciel need proper product images; homepage images are low-res crops of the design mockup.
- Unconfirmed: whether LiDAR/NFC on the iPhone 17 Pro Max work through the Xshielder case.

## HAG network link policy (`src/lib/links.ts`)

Use `externalLink(url, pageSlug(...))` for every outbound link: xshielder.com gets `rel="sponsored"` plus UTM
tags; competitors (list mirrors `scripts/hag_link_policy.py` and `public/assets/hag-links.js`) get
`rel="nofollow"`. The footer carries the network sponsor line and every page loads `/assets/hag-links.js`.

## Built features worth knowing

- **Find phones** (`src/pages/phones/index.astro`): sticky filter bar with two dropdowns, "Ex rating"
  (zones first; protection method last and deliberately low priority) and "Features". Requirements check:
  phones failing the Ex rating filters are hidden, or shown dimmed with a reason per requirement. Filter
  state is in the URL. Cards show only brand, model, zones, certification, OS, weight.
- **Compare tray** (`src/components/phone/CompareTray.astro`): site-wide, up to 4 phones, collapsed bar that
  expands on demand. Any `[data-compare-add="<slug>"]` button works. Selection in localStorage; data
  lazy-loaded from `/compare-data.json`.
- **Phone pages** (`src/pages/phones/[slug].astro`): zone coverage grid, Ex marking decoder, grouped specs,
  closest-alternatives table, generated FAQ, sources. Product/WebPage/Breadcrumb/FAQ JSON-LD.
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

## Every page must have

Semantic HTML, mobile-first layout, accessible markup, JSON-LD schema, titles ≤ 60 and descriptions ≤ 160
characters, an entry in the generated sitemap, and robots.txt left pointing at `/sitemap.xml`.
