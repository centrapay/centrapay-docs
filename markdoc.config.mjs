import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: 'github-light',
      langs: [],
    }),
  ],
  tags: {
    properties: {
      render: component('./src/components/Properties.astro'),
    },
    property: {
      render: component('./src/components/Property.astro'),
      attributes: {
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    },
    endpoint: {
      render: component('./src/components/Endpoint.astro'),
      attributes: {
        method: { type: String, required: true },
        path: { type: String, required: true },
      },
    },
    row: {
      render: component('./src/components/Row.astro'),
    },
    column: {
      render: component('./src/components/Column.astro'),
      attributes: {
        sticky: { type: Boolean },
      },
    },
    code: {
      render: component('./src/components/Code.astro'),
    },
  }
});
