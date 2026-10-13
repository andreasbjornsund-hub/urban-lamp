// @ts-check
import { defineConfig } from 'astro/config';

// The legacy site lives in public/ and is copied into dist/ unchanged, so its
// .html URLs keep working while new pages are built in src/pages/.
export default defineConfig({
  site: 'https://intrinsicallysafephones.com',
  // GitHub Pages serves /phones/ from phones/index.html and redirects /phones to it.
  trailingSlash: 'always',
  build: { format: 'directory' },
});
