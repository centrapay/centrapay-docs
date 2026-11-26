import { getImage } from 'astro:assets';
import defaultCover from '../assets/covers/default-cover.jpg';

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
