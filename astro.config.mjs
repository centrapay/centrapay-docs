import { defineConfig } from 'astro/config';
import flexsearchPlugin from './src/plugins/flexsearch';

import tailwind from '@astrojs/tailwind';

// Remark
import remarkSectionize from 'remark-sectionize';
import rehypeHighlight from 'rehype-highlight';
import { mermaid } from './src/plugins/mermaid';

// https://astro.build/config
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.centrapay.com',
  integrations: [
    vue(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkSectionize, mermaid],
    rehypePlugins: [rehypeHighlight],
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
