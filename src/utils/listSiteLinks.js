import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// Pages document models inline as click-to-reveal toggles beneath the rows
// that reference them, so the links a page offers are its section headings,
// those anchored headings, and the anchored reveal rows. Field anchors are
// left out: they follow the spec, not links other pages rely on.
function extractHeadings(filePath, urlPath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(fileContents);
  const links = Array.from(dom.window.document.querySelectorAll('h2, [data-link-target], [data-link-target] h3, li[id]'))
    .filter(element => element.id)
    .map(element => `${urlPath}#${element.id}`);
  return links;
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
