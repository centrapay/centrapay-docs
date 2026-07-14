const CUSTOM_DATA_TYPES = ['timestamp', 'bignumber', 'monetary', 'crn', 'location', 'phonenumber', 'pan'];

function resolvePointer(target, pointer) {
  let result = target;
  for (const part of pointer.replace(/^\//, '').split('/').filter(Boolean)) {
    result = result?.[part];
  }
  return result;
}

function resolveRef(ref, schemasMap) {
  const [filePart, pointer] = ref.split('#');
  const refId = filePart.split('/').pop().replace('.yaml', '');
  const target = schemasMap[refId];
  return pointer ? resolvePointer(target, pointer) : target;
}

const isRef = (obj) => obj && typeof obj === 'object' && '$ref' in obj;
const isObject = (obj) => obj && typeof obj === 'object';

export function resolveRefs(obj, schemasMap) {
  if (isRef(obj)) {
    return resolveRefs(resolveRef(obj['$ref'], schemasMap) ?? obj, schemasMap);
  }
  if (Array.isArray(obj)) {
    return obj.map(v => resolveRefs(v, schemasMap));
  }
  if (isObject(obj)) {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, resolveRefs(v, schemasMap)]));
  }
  return obj;
}

export function formatDescription(text) {
  return text
    ?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>') ?? null;
}

export function getExample(mediaType) {
  return Object.values(mediaType?.examples ?? {})[0]?.value;
}

export function getProperties(schema) {
  const required = schema?.required ?? [];
  return Object.entries(schema?.properties ?? {}).map(([name, prop]) => {
    const type = (prop['x-type'] ?? prop.type ?? 'string').toLowerCase();
    return {
      name,
      formattedType: type,
      typeLink: CUSTOM_DATA_TYPES.includes(type) ? `/api/data-types#${type}` : undefined,
      description: formatDescription(prop.description),
      isRequired: required.includes(name),
      isExperimental: !!prop['x-experimental'],
      isDeprecated: !!prop['x-deprecated'],
    };
  });
}

export function getErrors(responses) {
  return Object.entries(responses ?? {})
    .filter(([code]) => code !== '200')
    .flatMap(([code, response]) =>
      Object.entries(response?.content?.['application/json']?.examples ?? {})
        .map(([message, example]) => ({
          code,
          message,
          description: formatDescription(example.description),
        }))
    );
}

function buildRequestHeaders(requestBody) {
  const headers = { 'X-Api-Key': '<TOKEN>' };
  if (requestBody) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

export function buildEndpointData(operation) {
  return {
    method: operation['x-method'],
    path: operation['x-path'],
    request: {
      headers: buildRequestHeaders(operation.requestBody),
      payload: getExample(operation.requestBody?.content?.['application/json']),
    },
    response: getExample(operation.responses?.['200']?.content?.['application/json']),
  };
}
