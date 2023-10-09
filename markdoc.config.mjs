import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
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
    }
  }
});
