const colors = require('./src/assets/css/colors');

const disabledCss = {
  'code::before': false,
  'code::after': false,
  pre: false,
  code: false,
  'pre code': false,
  'code::before': false,
  'code::after': false,
  '*:not(pre) > * > code': false,
};

const tailwindConfig = {
  content: [
    './src/**/*.{astro,vue, js, css}',
  ],
  theme: {
    fontFamily: {
      'sans': [ 'Inter', 'Sans-Serif' ],
    },
    extend: {
      typography: {
        // DEFAULT: { css: disabledCss },
      },
      colors: {
        ...colors.light,
        current: 'currentColor',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('./src/assets/css/plugins/typography'),
    require('./src/assets/css/plugins/spacing'),
  ]
};

module.exports = tailwindConfig;
