#!/usr/bin/env node

import glob from 'glob';
import fs from 'fs/promises';
import { VFile } from 'vfile';
import { promisify } from 'util';
import grayMatter from 'gray-matter';
import { visit } from 'unist-util-visit';
import { createProcessor } from '@mdx-js/mdx';
import { toString } from 'mdast-util-to-string';
import { findAfter } from 'unist-util-find-after';

function remarkExtractSections() {
  return (tree, file, done) => {
    const data = this.data();
    visit(tree, 'heading', (node) => {
      const title = toString(node);
      const vFile = new VFile(file);
      const id = title.toLocaleLowerCase().replace(/\s/g, '-');
      const description = toString(findAfter(tree, node, 'paragraph'));
      const href = `${vFile.path.replace(/(content\/|\.md(x)?)/g, '')}#${id}`;

      data.sections.push({
        href,
        title,
        description,
      });
    }
    );
    done();
  };
}

async function main() {
  const sections = [];

  for (const path of await promisify(glob)('content/**/*.md')) {
    const compiler = createProcessor({ remarkPlugins: [remarkExtractSections] });
    const { data: frontMatter, content } = grayMatter(await fs.readFile(path));
    compiler.data('sections', [{
      title: frontMatter.title,
      description: frontMatter.description,
      href: path.replace(/content\//, '').replace(/\.md(x)?/, ''),
    }]);
    await compiler.process({ value: content, path });
    sections.push(...compiler.data('sections'));
  }

  await fs.writeFile('data.json', JSON.stringify(sections));
}

main()
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
