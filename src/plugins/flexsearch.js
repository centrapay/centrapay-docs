import glob from 'glob';
import fs from 'fs/promises';
import { promisify } from 'util';
import { rehype } from 'rehype';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

function slugify(str) {
  return str.toLowerCase().replace(/\s/g, '-');
}

function isH3(node) {
  return node.tagName === 'h3';
}

function isH2(node) {
  return node.tagName === 'h2';
}

function isHead(node) {
  return node.tagName == 'head';
}

function isTitle(node) {
  return node.tagName == 'title';
}

function isDescription(node) {
  return node.tagName == 'meta' && node.properties.name === 'description';
}

function formatSearch({ node, root, currentH2Heading }) {
  const nodeString = toString(node);
  switch (nodeString) {
  case 'Attributes':
  case 'Errors':
    return {
      title: `${currentH2Heading} ${nodeString}`,
      anchor: node.properties.id || nodeString,
      pageContext: currentH2Heading,
    };
  default:
    return {
      title: nodeString,
      description: 'hello',
      anchor: nodeString,
    };
  }
}

function processHeader({ root }) {
  let title;
  let description;
  visit(root, 'element', (node) => {
    if (isTitle(node)) {
      title = toString(node).replace(/\s-\sCentrapay\sDocs/, '');
    };
    if (isDescription(node)){
      description = node.properties.content;
    }
  });
  return {
    type: 'title',
    title,
    description,
  };
}

function extractSections(root) {
  const sections = [];
  let currentH2Heading = '';
  visit(root, 'element', (node) => {
    if (isH2(node)) {
      currentH2Heading = toString(node);
      sections.push(formatSearch({ node, root }));
    }
    if (isH3(node)) {
      sections.push(formatSearch({ node, root, currentH2Heading }));
    }
    if (isHead(node)) {
      sections.push(processHeader({
        root: node,
      }));
    }
  });

  return sections;
}

function rehypeExtractSections() {
  return (node, file) => {
    file.data.sections = extractSections(node);
  };
}

async function createFlexsearchIndexData() {
  let id = 0;
  const indexData = {};
  const processor = rehype().use(rehypeExtractSections);

  for (const filepath of await promisify(glob)('dist/api/accounts/index.html')) {
    const href = filepath.replace(/(dist)|index\.html/g, '');
    const content = await fs.readFile(filepath, 'utf-8');

    const vfile = await processor.process(content);

    // Add all other headings and their descriptions to the index
    vfile.data.sections.forEach(({ page, description, anchor, pageContext, type, title }) => {
      if(type == 'title') {
        indexData[id++] = {
          // path: pageContext ? path.concat(pageContext) : path,
          title,
          description,
          href,
        };
      } else {
        indexData[id++] = {
        // path: pageContext ? path.concat(pageContext) : path,
          title,
          description,
          href: `${href}#${slugify(anchor)}`,
        };
      };
    });
  }

  await fs.writeFile('dist/index-data.json', JSON.stringify(indexData));
}

export default function flexsearch() {
  return {
    name: 'flexsearch',
    hooks: {
      'astro:build:done': async () => await createFlexsearchIndexData(),
    }
  };
};
