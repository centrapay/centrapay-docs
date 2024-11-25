import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    blockquote: {
      ...nodes.blockquote,
      render: component('./src/components/Note.astro'),
    },
    fence: {
      attributes: {
        ...nodes.fence.attributes,
        title: { type: String, render: 'title' },
        mark: { type: Number, render: 'mark' }
      },
      render: component('./src/components/CodeFence.astro'),
    },
    link: {
      ...nodes.link,
      render: component('./src/components/Link.astro'),
    },
  },
});
