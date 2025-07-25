import { defineConfig } from 'astro/config';
import flexsearchPlugin from './src/plugins/flexsearch';

// Rehype plugins
import rehypeSectionize from '@hbsnow/rehype-sectionize';

// https://astro.build/config
import vue from '@astrojs/vue';

import markdoc from '@astrojs/markdoc';
import expressiveCode from 'astro-expressive-code';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.centrapay.com',
  integrations: [
    vue(),
    expressiveCode({
      themes: ['material-theme-palenight'],
      styleOverrides: {
        borderRadius: '0.5rem',
      },
    }),
    markdoc({ ignoreIndentation: true }),
  ],
  markdown: {
    rehypePlugins: [ rehypeSectionize ],
  },
  vite: {
    plugins: [flexsearchPlugin(), tailwindcss()]
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
    '/assets/wallet-assets/': '/api/wallet-assets/',
    '/api/': '/api/introduction/',
    '/guides/loading-and-sending-assets/': '/guides/transferring-assets/',
    '/guides/compatible-devices': '/guides/compatible-solutions',
  },
});
