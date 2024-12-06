import { defineConfig } from 'astro/config';
import flexsearchPlugin from './src/plugins/flexsearch';
import tailwind from '@astrojs/tailwind';

// Rehype plugins
import rehypeSectionize from '@hbsnow/rehype-sectionize';

// https://astro.build/config
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

import markdoc from '@astrojs/markdoc';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.centrapay.com',
  integrations: [
    vue(),
    tailwind({ applyBaseStyles: false }),
    expressiveCode(),
    mdx(),
    markdoc({ ignoreIndentation: true }),
  ],
  markdown: {
    rehypePlugins: [ rehypeSectionize ],
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
    '/fiat/bank-authorities/': '/api/bank-accounts/',
    '/fiat/authorities/': '/api/bank-accounts/',
    '/api/batch-types/farmlands': '/api/batch-types/farmlands-external-asset/',
    '/profile/': '/api/profiles/',
    '/quotas/': '/api/quotas/',
    '/auth/': '/api/auth/',
    '/settlements/': '/api/settlements/',
    '/api/payment-activities/': '/api/payment-requests/',
    '/transacting/': '/api/legacy-payment-requests/',
    '/api/transacting/': '/api/legacy-payment-requests/',
    '/merchants/': '/api/merchants/',
    '/fiat/funds-transfers/': '/api/funds-transfers/',
    '/assets/': '/api/assets/',
    '/assets/asset-categories': '/api/assets/',
    '/api/asset-categories/': '/api/assets/',
    '/assets/discrete-assets/': '/api/external-assets/',
    '/api/discrete-assets/': '/api/external-assets/',
    '/assets/asset-transfers/': '/api/asset-transfers/',
    '/assets/wallets/': '/api/wallets/',
    '/api/': '/api/introduction/',
    '/guides/loading-and-sending-assets/': '/guides/transferring-assets/',
  },
});
