import { getCollection } from '../utils/getCollection';
import { render } from 'astro:content';
import Navigation from '../navigation/Navigation';

const nav = [
  { title: 'Merchant Information' },
];

const collections = (await getCollection('merchantServices')).filter(page => page.id !== 'merchant-introduction');

const content = await Promise.all(collections.map(async page => {
  const { headings } = await render(page);
  page.headings = headings.filter(heading => heading.depth === 2);
  return page;
}));

const navigation = Navigation.create({ nav, content });

export default navigation;
