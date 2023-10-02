import { z, defineCollection } from 'astro:content';

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

export const collections = {
  'guides': collection,
  'connections': collection,
  'api': collection
};
