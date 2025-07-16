import plugin from 'tailwindcss/plugin';

const squishUtilitySizes = [ 1, 2, 4, 8, 16 ];
const stretchUtilitySizes = [ 2, 4, 8, 16, 32 ];

function makeSquishUtility(size) {
  return {
    [`.p-squish-${size}`]: {
      [`@apply py-${size} px-${size * 2}`]: {},
    }
  };
}

function makeStretchUtility(size) {
  return {
    [`.p-stretch-${size}`]: {
      [`@apply py-${size} px-${size / 2}`]: {},
    }
  };
}

const spacingPlugin = plugin(function({ addUtilities }) {
  addUtilities([
    ...squishUtilitySizes.map(makeSquishUtility),
    ...stretchUtilitySizes.map(makeStretchUtility),
  ], {
    variants: ['responsive'],
  });
});

export default spacingPlugin;
