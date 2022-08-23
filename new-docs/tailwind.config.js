const colors = require('./assets/css/colors');

const tailwindConfig = {
  content: [
    './pages/**/*.{vue,js,css}',
    './assets/**/*.{vue,js,css}',
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
    },
  },
  plugins: [
    require('./assets/css/plugins/typography'),
    require('./assets/css/plugins/spacing'),
  ],
};

module.exports = tailwindConfig;
