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
              'background-color': 'var(--color-surface-secondary)',
              'border-width': '1px',
              'border-color': 'var(--color-outline-opaque)',
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
          'primary': 'var(--color-surface-primary)',
          'secondary': 'var(--color-surface-secondary)',
          'tertiary': 'var(--color-surface-tertiary)',
          'tertiary-hover': 'var(--color-surface-tertiary-hover)',
          'accent': '#C6440E',
          'accent-light': '#FAF4E7',
          'inverse': '#111827',
          'inverse-hover': '#374151',
        },
        content: {
          'primary': 'var(--color-content-primary)',
          'secondary': 'var(--color-content-secondary)',
          'tertiary': 'var(--color-content-tertiary)',
          'inverse-primary': '#FFFFFF',
          'inverse-secondary': '#E5E7EB',
          'inverse-tertiary': '#D1D5DB',
          'accent': '#C6440E',
          'on-color': '#FFFFFF',
        },
        outline: {
          'opaque': 'var(--color-outline-opaque)',
          'transparent': 'var(--color-outline-transparent)',
        },
        interactive: {
          'primary': 'var(--color-interactive-primary)',
          'primary-hover': '#374151',
          'primary-active': '#FF5C00',
          'secondary': 'var(--color-interactive-secondary)',
          'secondary-hover': 'var(--color-interactive-secondary-hover)',
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
