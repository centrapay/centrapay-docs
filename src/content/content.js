import { z, defineCollection } from 'astro:content';

const guidesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    img: z.string(),
  }),
});

export const collections = {
  'guides': guidesCollection,
};
