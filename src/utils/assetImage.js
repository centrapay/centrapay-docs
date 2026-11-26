const images = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

export function assetImage(path) {
  return images[`/src/assets${path}`] ?? path;
}
