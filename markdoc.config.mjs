import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    link: {
      ...nodes.link,
      render: component('./src/components/Link.astro'),
    },
  },
  tags: {
    note: {
      render: component('./src/components/Note.astro'),
    },
  },
});
