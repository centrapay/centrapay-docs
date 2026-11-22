// Loads the OpenAPI content collections. Kept apart from OpenApiResolver so
// the resolver stays free of astro:content and can run under plain Node.
import { getCollection } from 'astro:content';
import { getPageSections, indexOperations } from './openApiPage.js';

const fileName = id => id.split('/').pop().replace(/\.yaml$/, '');

export async function loadSchemasMap() {
  const schemasCollection = await getCollection('openapiSchemas');
  return Object.fromEntries(
    schemasCollection.map(entry => [fileName(entry.id), entry.data])
  );
}

export async function loadOperations() {
  const endpointEntries = await getCollection('openapiEndpoints');
  return indexOperations(endpointEntries.map(entry => ({
    name: fileName(entry.id),
    operations: Object.values(entry.data),
  })));
}

// Every spec-driven page with its sections resolved, in the shape the page
// route and navigation both need.
export async function loadOpenApiPages() {
  const [schemasMap, operations, pageEntries] = await Promise.all([
    loadSchemasMap(),
    loadOperations(),
    getCollection('openapiPages'),
  ]);
  return pageEntries.map(entry => ({
    id: fileName(entry.id),
    page: entry.data,
    sections: getPageSections(entry.data, { models: schemasMap, operations }),
    schemasMap,
  }));
}
