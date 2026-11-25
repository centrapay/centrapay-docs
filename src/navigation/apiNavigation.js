import { getCollection } from '../utils/getCollection';
import { render } from 'astro:content';
import Navigation from '../navigation/Navigation';
import { navHeadings } from '../utils/openApiPage';
import { loadOpenApiPages } from '../utils/openApiLoader.js';

const nav = [
  { title: 'Using our APIs' },
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

// Spec-driven pages are rendered from the OpenAPI spec instead of mdoc files,
// so their navigation entries are built from the spec here.
async function getOpenApiEntries() {
  const pages = await loadOpenApiPages();
  return pages.map(({ id, page, sections }) => ({
    collection: 'api',
    id,
    data: { title: page.title, nav: page.nav },
    headings: navHeadings(sections),
  }));
}

const collections = await getCollection('api');
const content = await Promise.all(collections.map(async page => {
  const { headings } = await render(page);
  page.headings = headings.filter(heading => heading.depth === 2);
  return page;
}));
content.push(...await getOpenApiEntries());

const navigation = Navigation.create({ nav, content });

export default navigation;
