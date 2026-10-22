# Legacy pages (drafts, not published)

The old English pages, taken off the live site on 21 October 2026 when the Astro site went live. They are kept here
for reference and are not part of the build (only `public/` is copied into the site).

Each old URL now serves a small redirect page from `public/` (instant meta refresh plus a canonical link) that sends
visitors and search engines to the closest new page. Swap these for real 301s in Cloudflare when convenient:

| Old URL | New page |
|---|---|
| /best-atex-smartphones-2026.html | /best/zone-1-phones/ |
| /iphone-hazardous-area.html | /best/iphone/ |
| /top-5-atex-iphone-enclosures-zone-1.html | /best/iphone/ |
| /what-is-an-intrinsically-safe-phone.html | /guides/faq/ |
| /iphone-ex-case-vs-dedicated-atex-phone.html | /guides/android-vs-iphone-hazardous-areas/ |

`llms-full.txt` and `reasoning.json` held the old phone data and were drafted with the pages. The German (`/de/`),
Dutch (`/nl/`) and privacy pages stay live in `public/`.
