import { getCollection } from '../utils/getCollection';
import { render } from 'astro:content';
import Navigation from '../navigation/Navigation';

const nav = [
  { title: 'API Reference' },
  { title: 'Accounts' },
  { title: 'Assets' },
  { title: 'Bank Accounts' },
  { title: 'Batches' },
  { title: 'Events' },
  { title: 'Integrations' },
  { title: 'Invitations' },
  { title: 'Loyalty Programs' },
  { title: 'Media Uploads' },
  { title: 'Merchants' },
  { title: 'Payment Requests' },
  { title: 'Profiles' },
  { title: 'Quotas' },
  { title: 'Scanned Codes' },
  { title: 'Settlements' },
];

const collections = await getCollection('api');
const content = await Promise.all(collections.map(async page => {
  const { headings } = await render(page);
  page.headings = headings.filter(heading => heading.depth === 2);
  return page;
}));

const navigation = Navigation.create({ nav, content });

export default navigation;