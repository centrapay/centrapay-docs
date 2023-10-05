const colors = require('./src/assets/css/colors');
const typographyStyles = require('./typography');

const tailwindConfig = {
  content: [
    './src/**/*.{astro,vue, js, css}',
  ],
  theme: {
    fontFamily: {
      'sans': [ 'Inter', 'Sans-Serif' ],
    },
    typography: typographyStyles,
    extend: {
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
