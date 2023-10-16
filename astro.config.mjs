import { defineConfig } from 'astro/config';
import flexsearchPlugin from './src/plugins/flexsearch';

import tailwind from '@astrojs/tailwind';

// Remark
import remarkSectionize from 'remark-sectionize';
import { mermaid } from './src/plugins/mermaid';

// https://astro.build/config
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

import { visit } from 'unist-util-visit';
function rehypeParseCodeBlocks() {
  return (tree) => {
    visit(tree, 'element', (node, _nodeIndex, parentNode) => {
      if (node.tagName === 'code' && node.properties.className) {
        parentNode.properties.language = node.properties.className[0]?.replace(
          /^language-/,
          '',
        );
      }
    });
  };
}

function rehypeMetaAsAttributes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        node.properties.meta = node.data.meta;
      }
    });
  };
}


// https://astro.build/config
export default defineConfig({
  site: 'https://docs.centrapay.com',
  integrations: [
    vue(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [ rehypeParseCodeBlocks, rehypeMetaAsAttributes ],
    remarkPlugins: [remarkSectionize, mermaid],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'material-theme-darker',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
    },
  },
  vite: {
    plugins: [
      flexsearchPlugin(),
    ]
  },
  redirects: {
    '/guides/merchant-terminals/': '/guides/payment-flows/',
  },
});
