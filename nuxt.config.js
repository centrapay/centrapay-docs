export default defineNuxtConfig({
  components: {
    'dirs': [
      {
        'path': '~/components/icons',
        'global': true
      },
      '~/components'
    ]
  },
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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        // This is needed to send the entire URL of the page in Freshdesk support tickets
        // Refer to https://community.freshworks.com/freshdesk-11246/where-does-it-come-from-23026
        { name: 'referrer', content: 'no-referrer-when-downgrade' }
      ],
    },
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
