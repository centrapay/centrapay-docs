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

export const collections = {
  guides,
  connections,
  api,
};
