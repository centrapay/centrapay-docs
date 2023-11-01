import glob from 'glob';
import fs from 'fs/promises';
import { promisify } from 'util';
import { unified } from 'unified';
import grayMatter from 'gray-matter';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { findAfter } from 'unist-util-find-after';
import { findBefore } from 'unist-util-find-before';

function slugify(str) {
  return str.toLowerCase().replace(/\s/g, '-');
}

function stripBadge(str) {
  return str.replace(/<Badge.*>/, '').trim();
}

function formatSearch({ node, root }) {
  const nodeString = stripBadge(toString(node));

  switch (nodeString) {
  case 'Attributes':
    const parentHeading = stripBadge(toString(findBefore(root, node, 'heading')));
    return {
      title: `${parentHeading} ${nodeString}`,
      anchor: nodeString,
      pageContext: parentHeading,
    };
  case 'Errors':
    const headingNode = stripBadge(toString(findBefore(root, findBefore(root, node, 'heading'), 'heading')));
    return {
      title: `${headingNode} ${nodeString}`,
      anchor: nodeString,
      pageContext: headingNode,
    };
  default:
    return {
      title: nodeString,
      description: toString(findAfter(root, node, 'paragraph')),
      anchor: nodeString,
    };
  }
}

function extractSections(root) {
  const sections = [];
  visit(root, 'heading', (node) => {
    sections.push(formatSearch({ node, root }));
  });

  return sections;
}

function remarkExtractSections() {
  return (node, file) => {
    file.data.sections = extractSections(node);
  };
}

async function createFlexsearchIndexData() {
  let id = 0;
  const indexData = {};
  const processor = unified()
    .use(remarkParse)
    .use(remarkExtractSections)
    .use(remarkHtml);

  for (const filepath of await promisify(glob)('src/content/**/*.{md,mdx}')) {
    const href = filepath.replace(/(src\/content)|\.(mdx?)/g, '');
    const { data: frontMatter, content } = grayMatter(await fs.readFile(filepath));
    const path = [...frontMatter.nav.path.split('/'), frontMatter.nav.title ?? frontMatter.title];

    // Add the top level heading and it's description to the index
    indexData[id++] = {
      href,
      path,
      title: stripBadge(frontMatter.title),
      description: frontMatter.description,
    };

    const vfile = await processor.process(content);

    // Add all other headings and their descriptions to the index
    vfile.data.sections.forEach(({ title, description, anchor, pageContext }) => {
      indexData[id++] = {
        path: pageContext ? path.concat(pageContext) : path,
        title,
        description,
        href: `${href}#${slugify(anchor)}`,
      };
    });
  }

  await fs.writeFile('public/index-data.json', JSON.stringify(indexData));
}

export default function flexsearchPlugin() {
  return {
    name: 'flexsearch',
    options: async () => await createFlexsearchIndexData(),
  };
};
