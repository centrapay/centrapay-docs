export default defineNuxtConfig({
  modules: [
    '@nuxt/content'
  ],
  content: {
    documentDriven: true,
    markdown: {
      remarkPlugins: {
        'remark-sectionize': {},
      },
      toc: {
        depth: 4,
        searchDepth: 4,
      }
    },
    highlight: {
      theme: 'solarized-light',
      preload: [
        'bash',
      ]
    },
  },
  css: ['~/assets/css/tailwind.css'],
  app: {
    buildAssetsDir: '/nuxt/',
    head: {
      title: 'Centrapay Docs',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.ENV === 'development' ? 'http://0.0.0.0:4000' : 'https://docs.centrapay.com'
    }
  }
});
