// One photo per guide at src/assets/guides/<slug>.webp (16:9, 1200 × 675): the home page card and the guide's share image
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/guides/*.webp', { eager: true, import: 'default' });

const ALT: Record<string, string> = {
  'rugged-vs-intrinsically-safe-phones': 'Two workers in hard hats and high-visibility clothing beside pumps and pipework at a processing plant at sunrise',
  'android-vs-iphone-hazardous-areas': 'Two workers in high-visibility clothing at a tank farm, one holding a phone',
  'discontinued-intrinsically-safe-phones': 'An offshore worker in orange coveralls walking along a platform walkway above the sea',
  'intrinsically-safe-phone-cost': 'Two workers in hard hats walking along a path through a gas processing plant at sunset',
  faq: 'Two people in cleanroom suits talking beside stainless steel tanks in a pharmaceutical plant',
};

/** The guide's photo and alt text, or undefined when it has none */
export const guideImage = (slug: string) => {
  const img = files[`../assets/guides/${slug}.webp`];
  return img && { img, alt: ALT[slug] ?? '' };
};
