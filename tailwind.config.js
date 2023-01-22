const colors = require('./assets/css/colors');

const tailwindConfig = {
  content: [
    './pages/**/*.{vue,js,css}',
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js,css}',
    './app.vue',
  ],
  theme: {
    fontFamily: {
      'sans': [ 'Inter', 'Sans-Serif' ],
    },
    extend: {
      colors: {
        ...colors.light,
        current: 'currentColor',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: colors.light['brand-accent'],
              '&:hover': {
                color: colors.light['interactive-quaternary-active'],
                textDecorationLine: 'underline',
              },
            },
            'h2 > a, h3 > a, h4 > a': {
              color: colors.light['content-primary'],
              '&:hover': {
                textDecorationLine: 'none',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('./assets/css/plugins/typography'),
    require('./assets/css/plugins/spacing'),
  ]
};

module.exports = tailwindConfig;
