import typography from '@tailwindcss/typography';
import customTypography from './src/styles/plugins/typography.js';
import spacing from './src/styles/plugins/spacing.js';

export default {
  content: [
    './src/**/*.{astro,vue, js, css}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            'pre': { content: 'none' },
            'code': { content: 'none' },
            'pre code': { content: 'none' },
            '*:not(pre) > code': {
              'border-radius': '0.375rem',
              'background-color': '#F8F8F8',
              'border-width': '1px',
              'border-color': '#D1D5DB',
              'padding': '1px 3px',
              'text-color': '#111827',
              'font-size': '0.875rem',
              'line-height': '1.25rem',
              'font-weight': 'normal',
            }
          }
        },
      },
      colors: {
        current: 'currentColor',
        brand: {
          accent: '#FF5C00'
        },
        surface: {
          'primary': '#FFFFFF',
          'secondary': '#F8F8F8',
          'tertiary': '#F3F4F6',
          'accent': '#C6440E',
          'accent-light': '#FAF4E7',
        },
        content: {
          'primary': '#111827',
          'secondary': '#1F2937',
          'tertiary': '#6B7280',
          'inverse-primary': '#FFFFFF',
          'inverse-secondary': '#E5E7EB',
          'inverse-tertiary': '#D1D5DB',
          'accent': '#C6440E',
          'on-color': '#FFFFFF',
        },
        outline: {
          'opaque': '#D1D5DB',
          'transparent': '#00000008',
        },
        interactive: {
          'primary': '#111827',
          'primary-hover': '#374151',
          'primary-active': '#FF5C00',
          'secondary': '#4B5563',
          'secondary-hover': '#6B7280',
          'secondary-active': '#111827',
          'tertiary': '#F9FAFB',
          'tertiary-hover': '#FAF4E7',
          'tertiary-active': '#FAEBC9',
          'quaternary': '#FF5C00',
          'quaternary-hover': '#F1A51F',
          'quaternary-active': '#111827',
        },
        focus: {
          ring: '#FF5C00'
        }
      },
    },
  },
  plugins: [
    typography,
    customTypography,
    spacing,
  ],
};
