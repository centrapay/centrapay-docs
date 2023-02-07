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

function hrefFromFilepath(filepath) {
  return `/${filepath.replace(/(content\/|\.md)/g, '')}`;
}

function remarkExtractSections() {
  return (tree, file, done) => {
    const data = this.data();
    visit(tree, 'heading', (node) => {
      const title = toString(node);
      const vFile = new VFile(file);
      const id = title.toLocaleLowerCase().replace(/\s/g, '-');
      const description = toString(findAfter(tree, node, 'paragraph'));
      const href = `${hrefFromFilepath(vFile.path)}#${id}`;

      data.sections.push({
        href,
        title,
        description,
      });
    });
    done();
  };
}

async function main() {
  const sections = {};

  for (const path of await promisify(glob)('content/**/*.md')) {
    const compiler = createProcessor({ remarkPlugins: [remarkExtractSections] });
    const { data: frontMatter, content } = grayMatter(await fs.readFile(path));
    compiler.data('sections', [{
      title: frontMatter.title,
      description: frontMatter.description,
      href: hrefFromFilepath(path),
    }]);
    await compiler.process({ value: content, path });

    let key = frontMatter.nav.path;
    if (frontMatter.nav.title) {
      key += '/' + frontMatter.nav.title.toLowerCase().replace(/\s/g, '-');
    }

    if (!sections[key]) {
      sections[key] = [];
    }

    sections[key].push(...compiler.data('sections'));
  }

  await fs.mkdir('assets/js', { recursive: true });
  await fs.writeFile('assets/js/data.json', JSON.stringify(sections));
}

main()
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
