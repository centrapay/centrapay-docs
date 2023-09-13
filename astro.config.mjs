import { defineConfig } from 'astro/config';
import flexsearchPlugin from './src/plugins/flexsearch';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vue from '@astrojs/vue';

// Remark
import remarkSectionize from 'remark-sectionize';
import { mermaid } from './src/plugins/mermaid';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.centrapay.com',
  integrations: [
    vue(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [
      remarkSectionize,
      mermaid,
    ],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-light',
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
