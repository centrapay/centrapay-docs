import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
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
