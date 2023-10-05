module.exports = function typographyStyles({ theme }) {
  return {
    DEFAULT: {
      css: {
        '--tw-prose-body': theme('colors.zinc.700'),
        '--tw-prose-headings': theme('colors.zinc.900'),
        '--tw-prose-bold': theme('colors.zinc.900'),
        '--tw-prose-counters': theme('colors.zinc.500'),
        '--tw-prose-bullets': theme('colors.zinc.300'),
        '--tw-prose-hr': theme('colors.zinc.900 / 0.05'),
        '--tw-prose-quotes': theme('colors.zinc.900'),
        '--tw-prose-quote-borders': theme('colors.zinc.200'),
        '--tw-prose-captions': theme('colors.zinc.500'),
        '--tw-prose-th-borders': theme('colors.zinc.300'),
        '--tw-prose-td-borders': theme('colors.zinc.200'),

        // Base
        color: 'var(--tw-prose-body)',
        fontSize: theme('fontSize.sm')[0],
        lineHeight: theme('lineHeight.7'),

        // Layout
        '> *': {
          maxWidth: theme('maxWidth.2xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen lg': {
            maxWidth: theme('maxWidth.3xl'),
            marginLeft: `calc(50% - min(50%, ${theme('maxWidth.lg')}))`,
            marginRight: `calc(50% - min(50%, ${theme('maxWidth.lg')}))`,
          },
        },

        // Text
        p: {
          marginTop: theme('spacing.6'),
          marginBottom: theme('spacing.6'),
        },
        '[class~="lead"]': {
          fontSize: theme('fontSize.base')[0],
          ...theme('fontSize.base')[1],
        },

        // Lists
        ol: {
          listStyleType: 'decimal',
          marginTop: theme('spacing.5'),
          marginBottom: theme('spacing.5'),
          paddingLeft: '1.625rem',
        },
        'ol[type="A"]': {
          listStyleType: 'upper-alpha',
        },
        'ol[type="a"]': {
          listStyleType: 'lower-alpha',
        },
        'ol[type="A" s]': {
          listStyleType: 'upper-alpha',
        },
        'ol[type="a" s]': {
          listStyleType: 'lower-alpha',
        },
        'ol[type="I"]': {
          listStyleType: 'upper-roman',
        },
        'ol[type="i"]': {
          listStyleType: 'lower-roman',
        },
        'ol[type="I" s]': {
          listStyleType: 'upper-roman',
        },
        'ol[type="i" s]': {
          listStyleType: 'lower-roman',
        },
        'ol[type="1"]': {
          listStyleType: 'decimal',
        },
        ul: {
          listStyleType: 'disc',
          marginTop: theme('spacing.5'),
          marginBottom: theme('spacing.5'),
          paddingLeft: '1.625rem',
        },
        li: {
          marginTop: theme('spacing.2'),
          marginBottom: theme('spacing.2'),
        },
        ':is(ol, ul) > li': {
          paddingLeft: theme('spacing[1.5]'),
        },
        'ol > li::marker': {
          fontWeight: '400',
          color: 'var(--tw-prose-counters)',
        },
        'ul > li::marker': {
          color: 'var(--tw-prose-bullets)',
        },
        '> ul > li p': {
          marginTop: theme('spacing.3'),
          marginBottom: theme('spacing.3'),
        },
        '> ul > li > *:first-child': {
          marginTop: theme('spacing.5'),
        },
        '> ul > li > *:last-child': {
          marginBottom: theme('spacing.5'),
        },
        '> ol > li > *:first-child': {
          marginTop: theme('spacing.5'),
        },
        '> ol > li > *:last-child': {
          marginBottom: theme('spacing.5'),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: theme('spacing.3'),
          marginBottom: theme('spacing.3'),
        },

        // Horizontal rules
        hr: {
          borderColor: 'var(--tw-prose-hr)',
          borderTopWidth: 1,
          marginTop: theme('spacing.16'),
          marginBottom: theme('spacing.16'),
          maxWidth: 'none',
          marginLeft: `calc(-1 * ${theme('spacing.4')})`,
          marginRight: `calc(-1 * ${theme('spacing.4')})`,
          '@screen sm': {
            marginLeft: `calc(-1 * ${theme('spacing.6')})`,
            marginRight: `calc(-1 * ${theme('spacing.6')})`,
          },
          '@screen lg': {
            marginLeft: `calc(-1 * ${theme('spacing.8')})`,
            marginRight: `calc(-1 * ${theme('spacing.8')})`,
          },
        },

        // Quotes
        blockquote: {
          fontWeight: '500',
          fontStyle: 'italic',
          color: 'var(--tw-prose-quotes)',
          borderLeftWidth: '0.25rem',
          borderLeftColor: 'var(--tw-prose-quote-borders)',
          quotes: '"\\201C""\\201D""\\2018""\\2019"',
          marginTop: theme('spacing.8'),
          marginBottom: theme('spacing.8'),
          paddingLeft: theme('spacing.5'),
        },
        'blockquote p:first-of-type::before': {
          content: 'open-quote',
        },
        'blockquote p:last-of-type::after': {
          content: 'close-quote',
        },

        // Headings
        h1: {
          color: 'var(--tw-prose-headings)',
          fontWeight: '700',
          fontSize: theme('fontSize.2xl')[0],
          ...theme('fontSize.2xl')[1],
          marginBottom: theme('spacing.2'),
        },
        h2: {
          color: 'var(--tw-prose-headings)',
          fontWeight: '600',
          fontSize: theme('fontSize.lg')[0],
          ...theme('fontSize.lg')[1],
          marginTop: theme('spacing.16'),
          marginBottom: theme('spacing.2'),
        },
        h3: {
          color: 'var(--tw-prose-headings)',
          fontSize: theme('fontSize.base')[0],
          ...theme('fontSize.base')[1],
          fontWeight: '600',
          marginTop: theme('spacing.10'),
          marginBottom: theme('spacing.2'),
        },

        // Media
        'img, video, figure': {
          marginTop: theme('spacing.8'),
          marginBottom: theme('spacing.8'),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        figcaption: {
          color: 'var(--tw-prose-captions)',
          fontSize: theme('fontSize.xs')[0],
          ...theme('fontSize.xs')[1],
          marginTop: theme('spacing.2'),
        },

        // Tables
        table: {
          width: '100%',
          tableLayout: 'auto',
          textAlign: 'left',
          marginTop: theme('spacing.8'),
          marginBottom: theme('spacing.8'),
          lineHeight: theme('lineHeight.6'),
        },
        thead: {
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--tw-prose-th-borders)',
        },
        'thead th': {
          color: 'var(--tw-prose-headings)',
          fontWeight: '600',
          verticalAlign: 'bottom',
          paddingRight: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          paddingLeft: theme('spacing.2'),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody tr': {
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--tw-prose-td-borders)',
        },
        'tbody tr:last-child': {
          borderBottomWidth: '0',
        },
        'tbody td': {
          verticalAlign: 'baseline',
        },
        tfoot: {
          borderTopWidth: '1px',
          borderTopColor: 'var(--tw-prose-th-borders)',
        },
        'tfoot td': {
          verticalAlign: 'top',
        },
        ':is(tbody, tfoot) td': {
          paddingTop: theme('spacing.2'),
          paddingRight: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          paddingLeft: theme('spacing.2'),
        },
        ':is(tbody, tfoot) td:first-child': {
          paddingLeft: '0',
        },
        ':is(tbody, tfoot) td:last-child': {
          paddingRight: '0',
        },

        // Inline elements
        strong: {
          color: 'var(--tw-prose-bold)',
          fontWeight: '600',
        },
        ':is(a, blockquote, thead th) strong': {
          color: 'inherit',
        },

        // Overrides
        ':is(h1, h2, h3) + *': {
          marginTop: '0',
        },
        '> :first-child': {
          marginTop: '0 !important',
        },
        '> :last-child': {
          marginBottom: '0 !important',
        },
      },
    },
  };
};
