import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: "./src/content/guides" }),
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

const legacyApiSchema = z.object({
  title: z.string(),
  description: z.string(),
  img: z.string().optional(),
  draft: z.boolean().optional().default(false),
  nav: z.object({
    title: z.string().optional(),
    path: z.string(),
    order: z.number(),
  }),
});

const apiSchema = z.object({
  title: z.string(),
  description: z.string(),
  method: z.string(),
  path: z.string(),
  auth: z.boolean(),
  model: z.string(),
  experimental: z.boolean(),
  request: z.object({
    payload: z.array(z.object({
      name: z.string(),
      required: z.boolean(),
    })).optional(),
    params: z.array(z.object({
      name: z.string(),
    })).optional(),
  }).optional(),
  responses: z.array(z.object({
    code: z.number(),
    description: z.string(),
    message: z.string().optional(),
    type: z.enum(['array', 'object']).optional(),
    body: z.array(z.object({
      name: z.string(),
    })).optional(),
  })),
});

const modelSchema = z.object({
  title: z.string(),
  description: z.string(),
  properties: z.array(z.object({
    name: z.string(),
    type: z.enum([
      'string',
      'boolean',
      'crn',
      'timestamp',
      'date',
    ]),
    description: z.string(),
    example: z.union([
      z.string(),
      z.boolean(),
      z.date(),
    ]),
  })),
});

const api = defineCollection({
  loader: glob({ pattern: '**/*.(yaml|mdoc)', base: "./src/content/api" }),
  schema: z.union([
    apiSchema,
    modelSchema,
    legacyApiSchema,
  ])
});

export const collections = {
  guides,
  connections,
  api,
};
