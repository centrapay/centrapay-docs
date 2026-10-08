import fs from 'node:fs/promises';
import path from 'node:path';

const partialTag = /\{%\s*partial\s+file="([^"]+)"\s*\/%\}/g;

// Replace Markdoc `{% partial file="..." /%}` tags with the partial's content, so raw page
// source (e.g. for Copy as Markdown) includes what the rendered page shows.
// Partial paths are relative to the page, as Markdoc resolves them.
export default async function inlinePartials(body, pagePath) {
  const files = [ ...new Set([ ...body.matchAll(partialTag) ].map(match => match[1])) ];
  const contents = new Map(await Promise.all(files.map(async file => [
    file,
    (await fs.readFile(path.resolve(path.dirname(pagePath), file), 'utf-8')).trim(),
  ])));
  return body.replace(partialTag, (_, file) => contents.get(file));
}
