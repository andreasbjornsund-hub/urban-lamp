// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// The legacy site lives in public/ and is copied into dist/ unchanged, so its
// .html URLs keep working while new pages are built in src/pages/.
export default defineConfig({
  site: 'https://intrinsicallysafephones.com',
  // GitHub Pages serves /phones/ from phones/index.html and redirects /phones to it.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Downloaded from Google Fonts at build time and served from this site
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
