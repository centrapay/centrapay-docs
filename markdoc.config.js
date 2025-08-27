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
      validate(node) {
        const { href } = node.attributes;
        if (!href) {
          return [
            {
              id: 'link-href',
              level: 'error',
              message: 'Link href is required.',
            }
          ];
        }
        if (node.children.length !== 1 && !href.startsWith('mailto:')) {
          return [
            {
              id: 'link-href',
              level: 'error',
              message: `Link URLs should be masked with readable text. See ${href}`,
            }
          ];
        }
        if (href.startsWith('https://docs.centrapay.com')) {
          return [
            {
              id: 'link-href',
              level: 'error',
              message: `Internal link hrefs should be relative links. See ${href}`,
            }
          ];
        }
        return [];
      },
    },
  },
  tags: {
    badge: {
      render: component('./src/components/Badge.astro'),
      attributes: {
        type: { type: String },
      },
    },
    endpoint: {
      render: component('./src/components/Endpoint.astro'),
      attributes: {
        filename: { type: String },
        path: { type: String },
      },
    },
    error: {
      render: component('./src/components/Error.astro'),
      attributes: {
        code: { type: String },
        message: { type: String },
      },
    },
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
    wrapper: {
      render: component('./src/components/Wrapper.astro'),
      attributes: {
        class: { type: String },
      },
    },
    imageGrid: {
      render: component('./src/components/ImageGrid.astro'),
      attributes: {
        image: { type: String },
        caption: { type: String },
        imageWidth: { type: String },
      },
    },
    properties: {
      render: component('./src/components/Properties.astro'),
      attributes: {
        heading: { type: String },
      },
    },
    property: {
      render: component('./src/components/Property.astro'),
      attributes: {
        deprecated: { type: Boolean },
        experimental: { type: Boolean },
        name: { type: String },
        required: { type: Boolean },
        type: { type: String },
      },
    },
    mermaid: {
      render: component('./src/components/Mermaid.astro'),
    },
    accordion: {
      render: component('./src/components/Accordion.astro'),
      attributes: {
        title: { type: String, required: true },
      },
    },
  },
});
