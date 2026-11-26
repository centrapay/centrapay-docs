import { getImage } from 'astro:assets';
import defaultCover from '../assets/covers/default-cover.jpg';

const assets = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,webp,gif,svg}', { eager: true, import: 'default' });

export { defaultCover };

export function resolveImage(src) {
  if (typeof src !== 'string') {
    return src;
  }
  const image = assets[`/src/assets${src}`];
  if (!image) {
    throw new Error(`Image not found: src/assets${src}. Images live in src/assets so Astro can optimise them.`);
  }
  return image;
}

export async function socialImageUrl(img, site) {
  const image = await getImage({
    src: img ?? defaultCover,
    width: 1200,
    height: 630,
    fit: 'cover',
    format: 'jpg',
  });
  return new URL(image.src, site).href;
}
