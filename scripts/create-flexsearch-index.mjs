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

let id = 0;

function getPathFromFrontMatter(frontMatter) {
  return [...frontMatter.nav.path.split('/'), frontMatter.nav.title ?? frontMatter.title];
}

function hrefFromFilepath(filepath) {
  return `/${filepath.replace(/(content\/|\.md)/g, '')}`;
}

function remarkExtractSections() {
  return (tree, file, done) => {
    const data = this.data();
    visit(tree, 'heading', (node) => {
      const vFile = new VFile(file);

      const title = toString(node);
      const anchor = title.toLocaleLowerCase().replace(/\s/g, '-');

      const href = `${hrefFromFilepath(vFile.path)}#${anchor}`;
      const description = toString(findAfter(tree, node, 'paragraph'));

      data.sections.push({
        title,
        href,
        description,
      });
    });
    done();
  };
}

async function main() {
  const data = {};

  for (const path of await promisify(glob)('content/**/*.md')) {
    const { data: frontMatter, content } = grayMatter(await fs.readFile(path));
    const compiler = createProcessor({ remarkPlugins: [remarkExtractSections] });
    compiler.data('sections', [{
      title: frontMatter.title,
      href: hrefFromFilepath(path),
      description: frontMatter.description,
    }]);

    await compiler.process({ value: content, path });
    const sections = compiler.data('sections');

    // add path to sections
    const pathToSection = getPathFromFrontMatter(frontMatter);
    sections.forEach(section => {
      data[id++] = {
        href: section.href,
        path: pathToSection,
        title: section.title,
        description: section.description,
      };
    });
  }

  await fs.mkdir('assets/js', { recursive: true });
  await fs.writeFile('assets/js/data.json', JSON.stringify(data));
}

main()
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
