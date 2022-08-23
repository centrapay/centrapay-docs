import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  app: {
    buildAssetsDir: '/nuxt/'
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
});
