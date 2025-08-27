import { getCollection } from '../utils/getCollection';
import Navigation from '../navigation/Navigation';

const nav = [
  { title: 'Centrapay Experiences' },
  { title: 'Digital Assets' },
  { title: 'Merchant Services' },
  { title: 'Partner Services' },
  { title: 'Sales Channel Integrations' },
  { title: 'App Integrations' },
  { title: 'Farmlands' },
  { title: 'Developers' },
];

const content = await Promise.all([
  ...await getCollection('guides'),
  ...await getCollection('connections'),
]);


const navigation = Navigation.create({ nav, content });

export default navigation;