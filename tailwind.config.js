const colors = require('./src/assets/css/colors');

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
        DEFAULT: {
          css: {
            'code::before': false,
            'code::after': false,
            'pre': false,
            'code': false,
            'pre code': false,
            '*:not(pre) > code': {
              'border-radius': '0.375rem',
              'background-color': '#F8F8F8',
              'border-width': '1px',
              'border-color': '#D1D5DB',
              'padding': '1px 3px',
              'text-color': '#111827',
              'font-size': '0.875rem',
              'line-height': '1.25rem',
            }
          }
        },
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
