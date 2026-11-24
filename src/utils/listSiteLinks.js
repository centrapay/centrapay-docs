import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// The links a page offers are its section headings, plus the old anchors it
// redirects (AnchorRedirects.astro). Field anchors are left out: they follow
// the spec, not links other pages rely on.
function extractHeadings(filePath, urlPath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { document } = new JSDOM(fileContents).window;
  const headings = Array.from(document.querySelectorAll('h2'))
    .filter(element => element.id)
    .map(element => element.id);
  const redirected = Array.from(document.querySelectorAll('[data-anchor-redirects]'))
    .flatMap(element => JSON.parse(element.dataset.anchorRedirects));
  return [...headings, ...redirected].map(id => `${urlPath}#${id}`);
}

function listSiteLinks(directory) {
  const files = fs.readdirSync(directory);
  let links = new Set();
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      links = new Set([...links, ...listSiteLinks(filePath)]);
    } else if (stat.isFile() && filePath.endsWith('index.html')) {
      const urlPath = filePath.substring(filePath.indexOf('/'), filePath.lastIndexOf('/'));
      links = new Set([...links, urlPath, ...extractHeadings(filePath, urlPath)]);
    }
  }
  return links;
}

export {
  listSiteLinks,
};
