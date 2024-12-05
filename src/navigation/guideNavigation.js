import { getCollection } from '../utils/getCollection';
import Navigation from '../navigation/Navigation';

const nav = [
  {
    title: 'Reference',
    subTitle: 'Learn about core features',
    icon: 'Receipt',
    children: [
      { title: 'Centrapay Experiences' },
      { title: 'Digital Assets' },
      { title: 'Merchant Integrations' },
      { title: 'App Integrations' },
    ]
  },
  {
    title: 'Connections',
    subTitle: 'For our partners',
    icon: 'Connections',
    children: [
      { title: 'Farmlands' },
    ]
  },
];

const collections = await Promise.all([
  ...await getCollection('guides'),
  ...await getCollection('connections'),
]);

const content = await Promise.all(collections.map(async page => {
  const { headings } = await page.render();
  page.headings = headings.filter(heading => heading.depth === 2);
  return page;
}));

const navigation = Navigation.create({ nav, content });

export default navigation;
