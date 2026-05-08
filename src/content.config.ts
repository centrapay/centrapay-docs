import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    img: z.string().optional(),
    draft: z.boolean().optional().default(false),
    iframe: z.boolean().optional().default(false),
    nav: z.object({
      title: z.string().optional(),
      path: z.string(),
      order: z.number(),
    }),
  }),
});

const connections = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: "./src/content/connections" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    img: z.string().optional(),
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
  schema: z.object({
    title: z.string(),
    description: z.string(),
    img: z.string().optional(),
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
  schema: z.object({
    title: z.string(),
    description: z.string(),
    img: z.string().optional(),
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
  loader: glob({ pattern: 'models/**/*.yaml', base: './src/content/api/openapi' }),
});

export const collections = {
  guides,
  connections,
  api,
  merchantServices,
  openapiEndpoints,
  openapiSchemas,
};
