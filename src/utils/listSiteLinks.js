import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// The links a page offers are its section headings. Field anchors are left
// out: they follow the spec, not links other pages rely on.
function extractHeadings(filePath, urlPath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(fileContents);
  return Array.from(dom.window.document.querySelectorAll('h2'))
    .filter(element => element.id)
    .map(element => `${urlPath}#${element.id}`);
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
