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
      render: component('./src/components/Fence.astro'),
    },
    heading: {
      ...nodes.heading,
      render: component('./src/components/Heading.astro'),
    },
    image: {
      ...nodes.image,
      render: component('./src/components/Figure.astro'),
      attributes: {
        src: { type: String },
        alt: { type: String },
      },
    },
    link: {
      ...nodes.link,
      render: component('./src/components/Link.astro'),
    },
  },
  tags: {
    farmlandsSolutionCard: {
      render: component('./src/components/SolutionCard.astro'),
      attributes: {
        description: { type: String },
        imageSrc: { type: String },
        linkText: { type: String },
        linkUrl: { type: String },
        title: { type: String },
      },
    },
    gridList: {
      render: component('./src/components/Grid.astro'),
      attributes: {
        class: { type: String },
      },
    },
    mermaid: {
      render: component('./src/components/Mermaid.astro'),
    },
  },
});
