export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],
  content: {
    documentDriven: true
  },
  css: ['~/assets/css/tailwind.css'],
  app: {
    buildAssetsDir: '/nuxt/',
    head: {
      title: 'Centrapay Docs',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.ENV === 'development' ? 'http://0.0.0.0:4000' : 'https://docs.centrapay.com'
    }
  }
});
