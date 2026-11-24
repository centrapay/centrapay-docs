import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const DIST = 'dist';

// Any origin works: it only lets the URL API tell internal links from external ones.
const SITE = 'https://docs.test';

// Every page is an `index.html` inside a folder named for its URL path.
function listPageFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listPageFiles(entryPath);
    }
    return entry.name === 'index.html' ? [entryPath] : [];
  });
}

function toPagePath(file) {
  const folder = path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  return folder ? `/${folder}/` : '/';
}

function loadPages() {
  const pages = new Map();
  for (const file of listPageFiles(DIST)) {
    pages.set(toPagePath(file), new JSDOM(fs.readFileSync(file, 'utf8')).window.document);
  }
  return pages;
}

function withTrailingSlash(pathname) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

// Returns what is wrong with a link's fragment, or nothing if it is fine.
function findProblem(pages, link) {
  const target = pages.get(withTrailingSlash(link.pathname));
  const fragment = decodeURIComponent(link.hash.slice(1));
  const isBrowserConvention = fragment === '' || fragment === 'top';
  // Linkinator already reports links to pages that do not exist.
  if (!target || isBrowserConvention) {
    return undefined;
  }
  return target.getElementById(fragment) ? undefined : 'does not exist';
}

function findProblems(pages) {
  const problems = [];
  for (const [pagePath, document] of pages) {
    for (const anchor of document.querySelectorAll('a[href*="#"]')) {
      const link = new URL(anchor.getAttribute('href'), SITE + pagePath);
      const problem = link.origin === SITE && findProblem(pages, link);
      if (problem) {
        problems.push(`${pagePath} links to ${link.pathname}${link.hash}, which ${problem}`);
      }
    }
  }
  return problems;
}

// Linkinator checks that linked pages exist but ignores #fragments, so a link
// to a heading that was since renamed or removed still passes.
test('internal links should only point at fragments that exist', { timeout: 30000 }, () => {
  expect(findProblems(loadPages())).toEqual([]);
});
