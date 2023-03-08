import { z, defineCollection } from 'astro:content';

const guidesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    img: z.string().optional(),
    nav: z.object({
      title: z.string().optional(),
      path: z.string(),
      order: z.number(),
    }),
  }),
});

export const collections = {
  'guides': guidesCollection,
};
