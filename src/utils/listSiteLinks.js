/* eslint-disable complexity */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function extractAnchors(filePath, urlPath) {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(fileContents);
  const links = Array.from(dom.window.document.querySelectorAll('a'))
    .map(link => link.href)
    .filter(href => href && href.startsWith('about:blank#') && href !== 'about:blank#')
    .map(href => `${urlPath}${href.split('about:blank')[1]}`);
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
      links = new Set([...links, urlPath, ...extractAnchors(filePath, urlPath)]);
    } else if (stat.isFile() && filePath.endsWith('.html')) {
      const urlPath = filePath.substring(filePath.indexOf('/'), filePath.lastIndexOf('.'));
      links = new Set([...links, urlPath, ...extractAnchors(filePath, urlPath)]);
    }
  }
  return links;
}

module.exports = {
  listSiteLinks
};
