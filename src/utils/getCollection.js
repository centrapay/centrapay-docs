import { getCollection as get } from 'astro:content';

export async function getCollection(collection) {
  return await get(collection, ({ data }) => {
    return import.meta.env.MODE !== 'prod' || !data.draft;
  });
}
