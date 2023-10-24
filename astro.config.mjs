import { defineConfig } from 'astro/config';
import flexsearchPlugin from './src/plugins/flexsearch';
import tailwind from '@astrojs/tailwind';

// Remark plugins
import { mermaid } from './src/plugins/mermaid';

// Rehype plugins
import rehypeSectionize from '@hbsnow/rehype-sectionize';

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
    remarkPlugins: [ mermaid ],
    rehypePlugins: [ rehypeSectionize ],
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
    '/accounts/': '/api/accounts/',
    '/fiat/': '/api/bank-accounts/',
    '/fiat/bank-accounts/': '/api/bank-accounts/',
    '/fiat/bank-authorities': '/api/bank-accounts/',
    '/fiat/authorities': '/api/bank-accounts/',
    '/api/batch-types/farmlands': '/api/batch-types/farmlands-external-asset/',
    '/profile': '/api/profiles',
    '/quotas': '/api/quotas',
  },
});
