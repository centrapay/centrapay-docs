import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const collection = defineCollection({
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

const modelCollection = defineCollection({
  type: 'data',
  schema: z.object({
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
  }),
});

const apiReferenceCollection = defineCollection({
  type: 'data',
  schema: z.object({
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
  }),
});

export const collections = {
  'guides': collection,
  'connections': collection,
  'api': collection,
  'test-api': apiReferenceCollection,
  'models': modelCollection,
};
