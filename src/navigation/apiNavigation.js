import { getCollection } from '../utils/getCollection';
import Navigation from '../navigation/Navigation';

const nav = [
  { title: 'API Reference', order: 6 },
  { title: 'Accounts', order: 7 },
  { title: 'Assets', order: 8 },
  { title: 'Bank Accounts', order: 9 },
  { title: 'Batches', order: 10 },
  { title: 'Events', order: 11 },
  { title: 'Integrations', order: 12 },
  { title: 'Invitations', order: 13 },
  { title: 'Loyalty Programs', order: 14 },
  { title: 'Media Uploads', order: 15 },
  { title: 'Merchants', order: 16 },
  { title: 'Payment Requests', order: 17 },
  { title: 'Profiles', order: 18 },
  { title: 'Quotas', order: 19 },
  { title: 'Scanned Codes', order: 20 },
  { title: 'Settlements', order: 21 },
];

const collections = await getCollection('api');
const content = await Promise.all(collections.map(async page => {
  const { headings } = await page.render();
  page.headings = headings.filter(heading => heading.depth === 2);
  return page;
}));

const navigation = Navigation.create({ nav, content });

export default navigation;
