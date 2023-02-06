import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vue from '@astrojs/vue';

// Remark
import remarkSectionize from 'remark-sectionize';
import { mermaid } from './src/plugins/mermaid';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [
      remarkSectionize,
      mermaid,
    ]
  }
});
