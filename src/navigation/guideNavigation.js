import { getCollection } from '../utils/getCollection';
import { render } from 'astro:content';
import Navigation from '../navigation/Navigation';

const nav = [
  { title: 'Centrapay Experiences' },
  { title: 'Digital Assets' },
  { title: 'Merchant Information' },
  { title: 'Sales Channel Integrations' },
  { title: 'App Integrations' },
  { title: 'Farmlands' },
  { title: 'Developers' },
];

const collections = await Promise.all([
  ...await getCollection('guides'),
  ...await getCollection('connections'),
]);

const content = await Promise.all(collections.map(async page => {
  const { headings } = await render(page);
  page.headings = headings.filter(heading => heading.depth === 2);
  return page;
}));

const navigation = Navigation.create({ nav, content });

export default navigation;
