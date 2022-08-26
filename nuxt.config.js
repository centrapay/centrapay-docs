import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  modules: [
    '@nuxt/content'
  ],
  css: ['~/assets/css/tailwind.css'],
  app: {
    buildAssetsDir: '/nuxt/',
    head: {
      title: 'Centrapay Docs',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.ENV === 'development' ? 'http://0.0.0.0:3001' : 'https://docs.centrapay.com'
    }
  }
});
