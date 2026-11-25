import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: "./src/content/guides" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    img: image().optional(),
    draft: z.boolean().optional().default(false),
    iframe: z.boolean().optional().default(false),
    agentSkill: z.string().optional(),
    copyAsMarkdown: z.boolean().optional().default(false),
    nav: z.object({
      title: z.string().optional(),
      path: z.string(),
      order: z.number(),
    }),
  }),
});

const connections = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: "./src/content/connections" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    img: image().optional(),
    draft: z.boolean().optional().default(false),
    nav: z.object({
      title: z.string().optional(),
      path: z.string(),
      order: z.number(),
    }),
  }),
});

const api = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: "./src/content/api" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    img: image().optional(),
    draft: z.boolean().optional().default(false),
    nav: z.object({
      title: z.string().optional(),
      path: z.string(),
      order: z.number(),
    }),
  }),
});

const merchantServices = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: "./src/content/merchant-services" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    img: image().optional(),
    draft: z.boolean().optional().default(false),
    iframe: z.boolean().optional().default(false),
    nav: z.object({
      title: z.string().optional(),
      path: z.string(),
      order: z.number(),
    }),
  }),
});

const openapiEndpoints = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/api/openapi/endpoints' }),
});

const openapiSchemas = defineCollection({
  loader: glob({ pattern: ['models/**/*.yaml', 'index.yaml'], base: './src/content/api/openapi' }),
});

// Page layout for spec-driven API pages: which models, prose and endpoints
// appear, in what order. See src/utils/openApiPage.js.
const openapiPages = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/api/openapi/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    nav: z.object({
      title: z.string().optional(),
      path: z.string(),
      order: z.number(),
    }),
    intro: z.string().optional(),
    // `rule: false` drops the horizontal rule drawn above a section.
    sections: z.array(z.union([
      z.object({
        endpoint: z.string(),
        example: z.string().optional(),
        depth: z.number().optional(),
        rule: z.boolean().optional(),
      }).strict(),
      z.object({
        title: z.string(),
        depth: z.number().optional(),
        rule: z.boolean().optional(),
        body: z.string().optional(),
        badges: z.array(z.enum(['experimental', 'deprecated'])).optional(),
      }).strict(),
    ])),
  }),
});

export const collections = {
  guides,
  connections,
  api,
  merchantServices,
  openapiEndpoints,
  openapiSchemas,
  openapiPages,
};
