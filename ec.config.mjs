import { defineEcConfig } from 'astro-expressive-code';

// Code blocks scroll when they're taller or wider than their box, so they need
// to take keyboard focus for keyboard users to scroll them.
function focusableScroller() {
  const findPre = node => (node.tagName === 'pre' ? node : node.children?.map(findPre).find(Boolean));
  return {
    name: 'focusable-scroller',
    hooks: {
      postprocessRenderedBlock: ({ renderData }) => {
        const pre = findPre(renderData.blockAst);
        if (pre) {
          pre.properties.tabIndex = 0;
        }
      },
    },
  };
}

export default defineEcConfig({
  themes: ['material-theme-palenight'],
  styleOverrides: {
    borderRadius: '0.5rem',
  },
  plugins: [focusableScroller()],
});
