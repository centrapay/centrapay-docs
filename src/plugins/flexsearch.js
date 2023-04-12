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

function slugify(str) {
  return str.toLowerCase().replace(/\s/g, '-');
}

function extractSections(root) {
  const sections = [];

  visit(root, 'heading', (node) => {
    sections.push({
      title: toString(node),
      description: toString(findAfter(root, node, 'paragraph')),
    });
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
      title: frontMatter.title,
      description: frontMatter.description,
    };

    const vfile = await processor.process(content);
    // Add all other headings and their descriptions to the index
    vfile.data.sections.forEach(({ title, description }) => {
      indexData[id++] = {
        path,
        title,
        description,
        href: `${href}#${slugify(title)}`,
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
