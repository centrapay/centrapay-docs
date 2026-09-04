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
  const target = filePart
    ? schemasMap[filePart.split('/').pop().replace('.yaml', '')]
    : schemasMap['index'];
  return pointer ? resolvePointer(target, pointer) : target;
}

const isRef = (obj) => obj && typeof obj === 'object' && '$ref' in obj;
const isObject = (obj) => obj && typeof obj === 'object';

export function resolveRefs(obj, schemasMap) {
  if (isRef(obj)) {
    const resolved = resolveRef(obj['$ref'], schemasMap);
    if (resolved === undefined){ return obj; }
    return resolveRefs(resolved, schemasMap);
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
    ?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="font-semibold underline">$1</a>')
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

export function getParameterProperties(parameters) {
  return (parameters ?? [])
    .filter(param => param?.in === 'query')
    .map(param => {
      const type = (param.schema?.['x-type'] ?? param.schema?.type ?? 'string').toLowerCase();
      return {
        name: param.name,
        formattedType: type,
        typeLink: CUSTOM_DATA_TYPES.includes(type) ? `/api/data-types#${type}` : undefined,
        description: formatDescription(param.description),
        isRequired: !!param.required,
        isExperimental: !!param['x-experimental'],
        isDeprecated: !!param['x-deprecated'],
      };
    });
}

export function getErrors(responses, commonResponses = []) {
  const endpointErrors = Object.entries(responses ?? {})
    .filter(([code]) => code !== '200')
    .flatMap(([code, response]) =>
      Object.entries(response?.content?.['application/json']?.examples ?? {})
        .map(([message, example]) => ({
          code,
          message,
          description: formatDescription(example.description),
        }))
    );

  const sharedErrors = commonResponses
    .filter(response => response?.['x-status-code'])
    .flatMap(response =>
      Object.entries(response?.content?.['application/json']?.examples ?? {})
        .map(([message, example]) => ({
          code: response['x-status-code'],
          message,
          description: formatDescription(example.description),
        }))
    );

  return [...endpointErrors, ...sharedErrors].sort((a, b) => Number(a.code) - Number(b.code));
}

function buildRequestHeaders(requestBody) {
  const headers = { 'X-Api-Key': '<TOKEN>' };
  if (requestBody) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

function getParamExample(param) {
  return param.example ?? param.schema?.example;
}

function applyParam(path, queryString, param) {
  const example = getParamExample(param);
  if (example === undefined) {
    return path;
  }
  if (param.in === 'path') {
    return path.replace(`{${param.name}}`, String(example));
  }
  if (param.in === 'query') {
    queryString[param.name] = String(example);
  }
  return path;
}

// eslint-disable-next-line complexity
export function buildEndpointData(operation) {
  const queryString = {};
  let path = operation['x-path'];
  for (const param of operation.parameters ?? []) {
    path = applyParam(path, queryString, param);
  }
  const request = {
    headers: buildRequestHeaders(operation.requestBody),
    payload: getExample(operation.requestBody?.content?.['application/json']),
  };
  if (Object.keys(queryString).length > 0) {
    request.queryString = queryString;
  }
  return {
    method: operation['x-method'],
    path,
    request,
    response: getExample(operation.responses?.['200']?.content?.['application/json']),
  };
}
