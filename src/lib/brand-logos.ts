// Brand logos and certification marks in src/assets/{brands,marks}/<id>.{svg,png,webp}: single-colour black,
// with full-colour versions in a colour/ subfolder.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/{brands,marks}/**/*.{svg,png,webp}', {
  eager: true,
  import: 'default',
});

const find = (dir: string, id: string) =>
  Object.entries(files).find(([path]) => path.replace(/\.\w+$/, '').endsWith(`/${dir}/${id}`))?.[1];

/** tone="colour" prefers the colour/ file and falls back to the black one; undefined when there's no logo at all */
export const logo = (dir: 'brands' | 'marks', id: string, tone: 'colour' | 'mono' = 'mono') =>
  (tone === 'colour' && find(`${dir}/colour`, id)) || find(dir, id);

// Heavy logos (Xciel's solid stencil type) look bigger than their size, so they're set a little smaller
const OPTICAL: Record<string, number> = { xciel: 0.8 };

/** Height multiplier that gives every brand logo the same visual weight: wide wordmarks shorter, compact ones taller */
export function logoScale(slug: string, img: ImageMetadata): number {
  const fit = Math.min(1.25, Math.max(0.65, Math.sqrt(4 / (img.width / img.height))));
  return fit * (OPTICAL[slug] ?? 1);
}
