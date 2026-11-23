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

// The named example, or the first (default) one, or a single `example`.
export function getExample(mediaType, name) {
  const examples = mediaType?.examples ?? {};
  const example = name ? examples[name] : Object.values(examples)[0];
  return example ? example.value : mediaType?.example;
}

// The success response example and whether it's JSON (eg `OK` as text/plain).
export function responseExample(operation, exampleName) {
  const [contentType, mediaType] = Object.entries(successResponse(operation.responses)?.content ?? {})[0] ?? [];
  return {
    value: getExample(mediaType, exampleName),
    isJson: !contentType || contentType === 'application/json',
  };
}

function formatProperty(name, prop, schema, isRequired) {
  const type = (schema?.['x-type'] ?? schema?.type ?? 'string').toLowerCase();
  return {
    name,
    formattedType: type,
    typeLink: CUSTOM_DATA_TYPES.includes(type) ? `/api/data-types#${type}` : undefined,
    description: formatDescription(prop.description),
    isRequired,
    isExperimental: !!prop['x-experimental'],
    isDeprecated: !!prop['x-deprecated'],
  };
}

// The request body schema, whatever its media type (JSON, multipart, ...).
export function requestSchema(operation) {
  return Object.values(operation.requestBody?.content ?? {})[0]?.schema;
}

// An object property marked `x-flatten` is listed as its child properties,
// named `parent.child`, instead of as a single row.
export function getProperties(schema, prefix = '') {
  const required = schema?.required ?? [];
  return Object.entries(schema?.properties ?? {}).flatMap(([name, prop]) =>
    prop['x-flatten']
      ? getProperties(prop, `${prefix}${name}.`)
      : [formatProperty(`${prefix}${name}`, prop, prop, required.includes(name))]
  );
}

export function getParameterProperties(parameters) {
  return (parameters ?? [])
    .filter(param => param?.in === 'path' || param?.in === 'query')
    .map(param => formatProperty(param.name, param, param.schema, !!param.required));
}

const isSuccess = code => /^2\d\d$/.test(code);

// The documented success response: 200 when present, otherwise the first 2xx.
export function successResponse(responses) {
  const code = Object.keys(responses ?? {}).filter(isSuccess).sort()[0];
  return code ? responses[code] : undefined;
}

// Response attributes are only listed when the success response opts in with
// `x-render-properties`; most pages document the response via its model.
export function getResponseProperties(responses) {
  const response = successResponse(responses);
  if (!response?.['x-render-properties']) {
    return [];
  }
  return getProperties(response.content?.['application/json']?.schema);
}

export function getErrors(responses, commonResponses = []) {
  const endpointErrors = Object.entries(responses ?? {})
    .filter(([code]) => !isSuccess(code))
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

// Requests authenticate with an API key unless the operation documents its own
// headers via `x-request-headers` (eg a user JWT, or `{}` for public routes).
function buildRequestHeaders(operation) {
  const headers = { ...(operation['x-request-headers'] ?? { 'X-Api-Key': '<TOKEN>' }) };
  const contentType = Object.keys(operation.requestBody?.content ?? {})[0];
  if (contentType) {
    headers['Content-Type'] = contentType;
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
export function buildEndpointData(operation, exampleName) {
  const queryString = {};
  let path = operation['x-path'];
  for (const param of operation.parameters ?? []) {
    path = applyParam(path, queryString, param);
  }
  const request = {
    headers: buildRequestHeaders(operation),
    payload: getExample(operation.requestBody?.content?.['application/json'], exampleName),
  };
  // Non-JSON bodies (eg multipart uploads) are passed to httpsnippet as a HAR
  // postData object, since they can't be expressed as a JSON example.
  if (operation['x-request-postData']) {
    request.postData = operation['x-request-postData'];
  }
  if (Object.keys(queryString).length > 0) {
    request.queryString = queryString;
  }
  return {
    method: operation['x-method'],
    path,
    request,
    response: responseExample(operation, exampleName).value,
  };
}
