const plugin = require('tailwindcss/plugin');
const util = require('util');

const fontUtilitySpecs = [
  {
    name: 'display',
    styles: [
      'text-4xl',
      'md:text-5xl',
      'lg:text-6xl',
      'leading-tight',
      'tracking-tighter',
      'text-content-primary',
    ],
    normalStyles: 'font-light',
    boldStyles: 'font-semibold',
  },
  {
    name: 'headline-1',
    styles: [
      'text-3xl',
      'md:text-4xl',
      'lg:text-5xl',
      'leading-tight',
      'tracking-tight',
      'text-content-primary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'headline-2',
    styles: [
      'text-2xl',
      'md:text-3xl',
      'lg:text-4xl',
      'leading-tight',
      'tracking-tight',
      'text-content-primary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'headline-3',
    styles: [
      'text-xl',
      'md:text-2xl',
      'lg:text-3xl',
      'leading-tight',
      'tracking-tight',
      'text-content-primary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'headline-4',
    styles: [
      'text-lg',
      'md:text-xl',
      'lg:text-2xl',
      'leading-snug',
      'tracking-tight',
      'text-content-primary',
    ],
    normalStyles: 'font-medium',
    boldStyles: 'font-bold',
  },
  {
    name: 'body-1',
    styles: [
      'text-lg',
      'lg:text-xl',
      'leading-normal',
      'tracking-normal',
      'text-content-secondary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'body-2',
    styles: [
      'text-base',
      'lg:text-lg',
      'leading-normal',
      'tracking-normal',
      'text-content-tertiary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'body-3',
    styles: [
      'text-sm',
      'lg:text-base',
      'leading-normal',
      'tracking-normal',
      'text-content-secondary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'subtitle-1',
    styles: [
      'text-base',
      'lg:text-xl',
      'leading-snug',
      'tracking-normal',
      'text-content-secondary',
    ],
    normalStyles: 'font-medium',
    boldStyles: 'font-bold',
  },
  {
    name: 'subtitle-2',
    styles: [
      'text-sm',
      'lg:text-lg',
      'leading-snug',
      'tracking-normal',
      'text-content-secondary',
    ],
    normalStyles: 'font-medium',
    boldStyles: 'font-semibold',
  },
  {
    name: 'caption-1',
    styles: [
      'text-sm',
      'lg:text-base',
      'leading-normal',
      'tracking-normal',
      'text-content-tertiary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'caption-2',
    styles: [
      'text-xs',
      'lg:text-sm',
      'leading-normal',
      'tracking-normal',
      'text-content-tertiary',
    ],
    normalStyles: 'font-normal',
    boldStyles: 'font-semibold',
  },
  {
    name: 'overline',
    styles: [
      'text-xs',
      'md:text-sm',
      'lg:text-sm',
      'leading-normal',
      'tracking-wider',
      'text-content-secondary',
      'uppercase',
    ],
    normalStyles: 'font-medium',
    boldStyles: 'font-bold',
  },
];

function joinStyles(arrayOrString) {
  return [].concat(arrayOrString).join(' ');
}

function assertSpecProp(spec, prop) {
  if (!spec[prop]) {
    throw Error(`Missing spec.${prop}: Spec ${util.inspect(spec, null, null)}`);
  }
}

function makeFontUtility(spec) {
  assertSpecProp(spec, 'name');
  assertSpecProp(spec, 'styles');
  assertSpecProp(spec, 'normalStyles');
  assertSpecProp(spec, 'boldStyles');

  return {
    [`.type-${spec.name}`]: {
      [`@apply ${joinStyles([ spec.normalStyles, ...spec.styles ])}`]: {},
    }
  };
}

function makeBoldFontUtility(spec) {
  return {
    [`.type-${spec.name} b`]: {
      [`@apply ${joinStyles(spec.boldStyles)}`]: {},
    }
  };
}

const typographyPlugin = plugin(function({ addComponents }) {
  // This is declared as a component so it has a lower precedence than the colors utilities.
  addComponents([
    ...fontUtilitySpecs.map(makeFontUtility),
    ...fontUtilitySpecs.map(makeBoldFontUtility),
  ], {
    variants: ['responsive'],
  });

});

module.exports = typographyPlugin;
