// Guide photos live in src/assets/guides/<name>.webp (16:9, 1200 × 675). Each guide lists its photos in order: the first is
// its main photo (the home page card and the share image), and all of them are spaced out through the guide's body
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/guides/*.webp', { eager: true, import: 'default' });

const PHOTOS: Record<string, { file: string; alt: string }[]> = {
  'rugged-vs-intrinsically-safe-phones': [
    { file: 'marine-deck-phone-pocket-detail', alt: "A worker in orange coveralls on a ship's deck, slipping a phone into a back pocket" },
    { file: 'fuel-depot-worker-conversation', alt: 'Two workers in hard hats and high-visibility coveralls talking beside a tanker at a fuel depot, one holding a phone' },
  ],
  'android-vs-iphone-hazardous-areas': [
    { file: 'offshore-platform-walkway', alt: 'An offshore worker in orange coveralls walking along a platform walkway above the sea' },
    { file: 'chemical-facility-shared-phone-check', alt: 'Two workers in hard hats looking at a phone together outside a chemical facility' },
  ],
  'discontinued-intrinsically-safe-phones': [
    { file: 'tank-farm-workers', alt: 'Two workers in high-visibility clothing at a tank farm, one holding a phone' },
    { file: 'offshore-worker-close-conversation', alt: 'An offshore worker in a hard hat and safety glasses talking with a colleague on a platform above the sea' },
    { file: 'processing-plant-pumps-sunrise', alt: 'Two workers in hard hats and high-visibility clothing beside pumps and pipework at a processing plant at sunrise' },
  ],
  'intrinsically-safe-phone-cost': [
    { file: 'gas-plant-path-sunset', alt: 'Two workers in hard hats walking along a path through a gas processing plant at sunset' },
    { file: 'distillery-worker-vessels', alt: 'A worker in overalls and a hairnet reading a phone among stainless steel vessels at a distillery' },
  ],
  faq: [
    { file: 'pharma-cleanroom-conversation', alt: 'Two people in cleanroom suits talking beside stainless steel tanks in a pharmaceutical plant' },
    { file: 'paint-production-over-shoulder', alt: 'A worker in a hard hat and safety glasses checking a mixing vessel at a paint production plant' },
  ],
};

/** The guide's photos with alt text, main photo first (empty when it has none) */
export const guidePhotos = (slug: string) =>
  (PHOTOS[slug] ?? []).map(({ file, alt }) => {
    const img = files[`../assets/guides/${file}.webp`];
    if (!img) throw new Error(`/guides/${slug}/: no photo at src/assets/guides/${file}.webp`);
    return { img, alt };
  });

/** The guide's main photo and alt text, or undefined when it has none */
export const guideImage = (slug: string) => guidePhotos(slug)[0];
