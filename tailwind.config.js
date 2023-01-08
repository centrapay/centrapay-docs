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
      typography: {
        DEFAULT: {
          css: {
            h2: {
              borderTopWidth: '1px',
              paddingTop: '48px',
            },
            h3: {
              paddingTop: '32px',
            },
            'h2 > a, h3 > a': {
              textDecorationLine: 'none',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('./assets/css/plugins/typography'),
    require('./assets/css/plugins/spacing'),
  ]
};

module.exports = tailwindConfig;
