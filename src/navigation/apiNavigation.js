import { getCollection } from '../utils/getCollection';
import { getCollection as getContentCollection } from 'astro:content';
import { render } from 'astro:content';
import Navigation from '../navigation/Navigation';
import {
  orderEndpoints,
  getPaymentRequestsSections,
  PAYMENT_REQUESTS_ID,
} from '../utils/openApiPage';

const nav = [
  { title: 'API Reference' },
  { title: 'Accounts' },
  { title: 'Asset Programs' },
  { title: 'Assets' },
  { title: 'Bank Accounts' },
  { title: 'Batches' },
  { title: 'Connections' },
  { title: 'Events' },
  { title: 'Integrations' },
  { title: 'Invitations' },
  { title: 'Loyalty Programs' },
  { title: 'Media Uploads' },
  { title: 'Merchants' },
  { title: 'Onboarding' },
  { title: 'Payment Requests' },
  { title: 'Profiles' },
  { title: 'Quotas' },
  { title: 'Scanned Codes' },
  { title: 'Settlements' },
  { title: 'Wallets' },
  { title: 'Webhooks' },
];

// The Payment Requests page is rendered from the OpenAPI spec instead of an
// mdoc file, so its navigation entry is built from the spec here.
async function getPaymentRequestsEntry() {
  const schemasCollection = await getContentCollection('openapiSchemas');
  const schemasMap = Object.fromEntries(
    schemasCollection.map(entry => [entry.id.split('/').pop().replace(/\.yaml$/, ''), entry.data])
  );
  const index = schemasMap['index'];
  const page = index.info['x-page'];

  const endpointEntries = await getContentCollection('openapiEndpoints');
  const endpointFiles = endpointEntries.map(entry => ({
    name: entry.id.split('/').pop().replace(/\.yaml$/, ''),
    operations: Object.values(entry.data),
  }));
  const sections = getPaymentRequestsSections({
    models: page.models.map(name => ({ name, title: schemasMap[name]['x-title'] ?? name })),
    extras: page.extras,
    endpoints: orderEndpoints(index, endpointFiles),
  });

  return {
    collection: 'api',
    id: PAYMENT_REQUESTS_ID,
    data: { title: page.title, nav: page.nav },
    headings: sections
      .filter(section => section.depth === 2)
      .map(section => ({ depth: 2, slug: section.anchor, text: section.title })),
  };
}

const collections = await getCollection('api');
const content = await Promise.all(collections.map(async page => {
  const { headings } = await render(page);
  page.headings = headings.filter(heading => heading.depth === 2);
  return page;
}));
content.push(await getPaymentRequestsEntry());

const navigation = Navigation.create({ nav, content });

export default navigation;
