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

// --- Click-to-reveal model documentation -------------------------------------
//
// Routes document complex objects inline: a property, parameter or response
// whose schema references a model with fields renders as a `<details>` element
// revealing those fields, instead of the page front-loading dedicated model
// sections. The tree produced here carries no anchors; openApiPage.js assigns
// each field its anchor.

const isRef = obj => obj && typeof obj === 'object' && '$ref' in obj;

// A schema that is nothing but a `$ref`, so its siblings (type, description...)
// belong to the property rather than the referenced model.
const isPureRef = obj => isRef(obj) && Object.keys(obj).length === 1;

// A whole-file reference points at a model's own schema; a pointer reference
// (`#/properties/name`) points at one property inside it.
function modelRef(ref, models) {
  const [filePart, pointer] = ref.split('#');
  if (!filePart) {
    return null;
  }
  const name = filePart.split('/').pop().replace(/\.yaml$/, '');
  const schema = pointer ? resolvePointer(models[name], pointer) : models[name];
  if (!schema || typeof schema !== 'object') {
    return null;
  }
  // `index.yaml` holds shared components (ApiError), not documented models.
  return { name: name === 'index' ? undefined : name, schema, wholeModel: !pointer };
}

function revealBadges(data) {
  const badges = [];
  if (data['x-experimental']) {
    badges.push('experimental');
  }
  if (data['x-deprecated']) {
    badges.push('deprecated');
  }
  return badges;
}

function hasFields(schema) {
  return Boolean(schema?.properties);
}

// The whole models referenced by composition members (`allOf`, `oneOf`...).
function wholeModelRefs(members, models) {
  return members
    .map(member => isPureRef(member) ? modelRef(member.$ref, models) : null)
    .filter(ref => ref?.wholeModel);
}

// The models that vary another model: `oneOf`/`anyOf` members (eg a
// promotion's challenge or draw params) and the models an `x-variants` base
// model extends (eg an asset activity's type-specific shape).
function variantReveals(schema, models, stack) {
  const composed = wholeModelRefs([...(schema.oneOf ?? []), ...(schema.anyOf ?? [])], models)
    .map(ref => modelReveal(ref, models, stack));
  const listed = (schema['x-variants'] ?? [])
    .filter(name => models[name])
    .map(name => modelReveal({ name, schema: models[name] }, models, stack));
  return [...composed, ...listed].filter(Boolean);
}

// The reveal for a whole model: its title, intro and outro prose, its fields,
// and the models that vary it.
function modelReveal({ name, schema }, models, stack) {
  if (name && stack.includes(name)) {
    return undefined;
  }
  const nestedStack = name ? [...stack, name] : stack;
  return {
    model: name,
    title: schema['x-title'] ?? name,
    badges: revealBadges(schema),
    intro: schema['x-intro'],
    outro: schema['x-outro'],
    rows: objectRows(schema, models, nestedStack),
    variants: variantReveals(schema, models, nestedStack),
  };
}

// Fields merged in from `allOf` members that are not whole-model refs —
// whole-model refs become variant reveals instead, so their fields must not
// also be merged here.
function mergedMemberRows(schema, models, stack) {
  return (schema?.allOf ?? []).flatMap(member => {
    const ref = isPureRef(member) ? modelRef(member.$ref, models) : { schema: member };
    if (!ref?.schema || typeof ref.schema !== 'object' || ref.wholeModel) {
      return [];
    }
    return objectRows(ref.schema, models, stack);
  });
}

// Rows for one schema's own properties, in `allOf`-merged then own order.
function objectRows(schema, models, stack) {
  const required = new Set(schema?.required ?? []);
  return [
    ...mergedMemberRows(schema, models, stack),
    ...Object.entries(schema?.properties ?? {})
      .flatMap(([name, prop]) => propertyRow(name, prop, required.has(name), models, stack)),
  ];
}

function rowType(prop, target) {
  return (target?.['x-type'] ?? target?.type ?? prop.type ?? 'string').toLowerCase();
}

const COMPOSITE_KEYS = ['properties', 'allOf', 'oneOf', 'anyOf'];

function isUntypedComposite(schema) {
  const target = schema ?? {};
  return !target.type && !target['x-type'] && COMPOSITE_KEYS.some(key => target[key]);
}

function itemType(items, models) {
  const target = isRef(items) ? modelRef(items.$ref, models)?.schema : items;
  return isUntypedComposite(target) ? 'object' : rowType(items, target);
}

function pluralType(text) {
  return text.replace(/^(\w+)/, word => (word.endsWith('s') ? word : `${word}s`));
}

function typeLabel(type, prop, target, models) {
  const items = (target ?? prop)?.items;
  if (type !== 'array' || !items) {
    return type;
  }
  return `array of ${pluralType(typeLabel(itemType(items, models), items, undefined, models))}`;
}

export function customTypeLink(type) {
  return CUSTOM_DATA_TYPES.includes(type) ? `/api/data-types#${type}` : undefined;
}

function rowDescription(prop, target) {
  return formatDescription(prop.description ?? target?.description);
}

function rowBadges(prop, target) {
  return {
    isExperimental: Boolean(prop['x-experimental'] ?? target?.['x-experimental']),
    isDeprecated: Boolean(prop['x-deprecated'] ?? target?.['x-deprecated']),
  };
}

// A property may document its possible values in a reference table
// (`x-table`), revealed inline from the row instead of a page section.
function rowTable(name, prop) {
  const table = prop?.['x-table'];
  if (!table) {
    return undefined;
  }
  if (!table.title || !table.body) {
    throw new Error(`x-table on "${name}" needs a title and a body`);
  }
  return { title: table.title, body: table.body };
}

// A property's possible values: structured entries (`x-values`), each value
// stacked over its description with optional labelled notes, or else the
// bare names of an `enum`. A title keeps the anchor of the page section the
// values used to live in.
function rowValues(name, prop, target) {
  const values = prop?.['x-values'] ?? target?.['x-values'];
  const names = enumNames(prop) ?? enumNames(target);
  return values ? structuredValues(name, values, names) : enumValues(names);
}

// Enum values the entries don't describe are still listed, by name.
function structuredValues(name, values, names = []) {
  if (!(values.entries ?? []).some(entry => entry.name)) {
    throw new Error(`x-values on "${name}" needs entries`);
  }
  const described = new Set(values.entries.map(entry => plainValue(entry.name)));
  const undescribed = names.filter(value => !described.has(String(value))).map(value => ({ name: String(value) }));
  return { title: values.title, intro: values.intro, entries: [...values.entries, ...undescribed] };
}

export function plainValue(text = '') {
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/`/g, '');
}

function enumValues(names) {
  return names ? { entries: names.map(value => ({ name: String(value) })) } : undefined;
}

// A field can reuse another field's values through a single `allOf` ref while
// keeping its own description, eg a request field and its model's field.
function valuesSource(prop, target, models) {
  return reusedValues(prop, models) ?? target;
}

function reusedValues(prop, models) {
  const members = prop?.allOf ?? [];
  if (members.length !== 1 || !isPureRef(members[0])) {
    return undefined;
  }
  return modelRef(members[0].$ref, models)?.schema;
}

function enumNames(schema) {
  return schema?.enum ?? schema?.items?.enum;
}

function valuesTypeLabel(type) {
  return type === 'array' ? 'array of enums' : 'enum';
}

// One attribute row, possibly with a reveal or a reference table hanging off
// it.
function propertyRow(name, prop, isRequired, models, stack) {
  if (prop?.['x-flatten']) {
    // An x-flatten property lists its child properties as `parent.child` rows
    // instead of a row of its own.
    return objectRows(prop, models, stack).map(row => ({ ...row, name: `${name}.${row.name}` }));
  }
  const target = isRef(prop) ? modelRef(prop.$ref, models)?.schema : prop;
  const type = rowType(prop, target);
  const values = rowValues(name, prop, valuesSource(prop, target, models));
  return [{
    name,
    formattedType: type,
    typeLabel: values ? valuesTypeLabel(type) : typeLabel(type, prop, target, models),
    typeLink: customTypeLink(type),
    description: rowDescription(prop, target),
    isRequired,
    ...rowBadges(prop, target),
    reveal: propertyReveal(prop, models, stack),
    table: rowTable(name, prop),
    values,
  }];
}

// The reveal a property's schema documents, if any. A whole-model reference
// (directly, as array items, or through a single-model `allOf`) reveals that
// model; several models reveal as variants; an inline object reveals its own
// fields unless a custom data type documents it on the data-types page.
function propertyReveal(prop, models, stack) {
  if (isPureRef(prop)) {
    return refReveal(prop, models, stack);
  }
  if (prop.allOf) {
    return allOfReveal(prop, models, stack);
  }
  if (prop.oneOf || prop.anyOf) {
    return composedReveal(prop, models, stack);
  }
  if (prop.type === 'array') {
    return itemsReveal(prop, models, stack);
  }
  return inlineReveal(prop, models, stack);
}

// An array row reveals whatever its items document.
function itemsReveal(prop, models, stack) {
  if (!prop.items) {
    return undefined;
  }
  return propertyReveal(prop.items, models, stack);
}

// A whole-model reference reveals that model; a pointer reference lands on one
// property inside it, so whatever that property documents is what the row
// reveals.
function refReveal(prop, models, stack) {
  const ref = modelRef(prop.$ref, models);
  if (!ref) {
    return undefined;
  }
  return ref.wholeModel ? modelReveal(ref, models, stack) : propertyReveal(ref.schema, models, stack);
}

// A single whole-model `allOf` ref reveals that model; several refs (eg a
// promotion membership's params are the promotion's params plus the
// membership's progress) reveal as variants; otherwise inline members reveal
// their own fields.
function allOfReveal(prop, models, stack) {
  const refs = wholeModelRefs(prop.allOf, models);
  if (refs.length === 0) {
    return inlineReveal(prop, models, stack);
  }
  const localRows = hasFields(prop) ? objectRows(prop, models, stack) : [];
  if (refs.length === 1 && localRows.length === 0) {
    return modelReveal(refs[0], models, stack);
  }
  return {
    title: undefined,
    badges: [],
    intro: undefined,
    outro: undefined,
    rows: localRows,
    variants: refs.map(ref => modelReveal(ref, models, stack)),
  };
}

// `oneOf`/`anyOf` members document the shapes a property can take; each
// whole-model member reveals as a variant.
function composedReveal(prop, models, stack) {
  const members = [...(prop.oneOf ?? []), ...(prop.anyOf ?? [])];
  const variants = wholeModelRefs(members, models)
    .map(ref => modelReveal(ref, models, [...stack]));
  const inlineRows = members
    .filter(member => !isPureRef(member))
    .flatMap(member => objectRows(member, models, stack));
  if (variants.length === 0 && inlineRows.length === 0) {
    return undefined;
  }
  return { title: prop['x-title'], badges: [], intro: undefined, outro: undefined, rows: inlineRows, variants };
}

// An inline object reveals its own fields, unless a custom data type already
// documents it on the data-types page.
function inlineReveal(prop, models, stack) {
  if (!hasFields(prop) || CUSTOM_DATA_TYPES.includes((prop['x-type'] ?? '').toLowerCase())) {
    return undefined;
  }
  return {
    model: undefined,
    title: prop['x-title'],
    badges: revealBadges(prop),
    intro: undefined,
    outro: undefined,
    rows: objectRows(prop, models, stack),
    variants: [],
  };
}

// Rows for a request body or response object schema.
export function propertyRows(schema, models) {
  return objectRows(schema, models, []);
}

// The documented success response: the model's (or the inline object's) own
// fields listed under the Response heading, with variants and nested reveals
// inline — a top-level response object is never itself hidden behind a
// toggle.
export function responseModel(operation, models) {
  const schema = firstMediaSchema(successResponse(operation.responses));
  if (!schema) {
    return undefined;
  }
  return responseShape(arrayItems(schema), models);
}

// The success response's schema, whatever its media type.
function firstMediaSchema(response) {
  const media = Object.values(response?.content ?? {})[0];
  return media?.schema;
}

// A list response documents the shape of its items.
function arrayItems(schema) {
  if (schema.type === 'array') {
    return schema.items ?? {};
  }
  return schema;
}

function responseShape(schema, models) {
  const reveal = propertyReveal(schema, models, []);
  if (reveal && (reveal.model || reveal.variants.length > 0)) {
    return {
      model: reveal.model,
      title: reveal.title,
      intro: reveal.intro,
      outro: reveal.outro,
      rows: reveal.rows,
      variants: reveal.variants,
    };
  }
  return hasFields(schema) ? { rows: objectRows(schema, models, []) } : undefined;
}

// The fields of an error response's body, from its schema (usually ApiError).
export function errorBodyRows(response, models) {
  const schema = firstMediaSchema(response);
  const target = isPureRef(schema) ? modelRef(schema.$ref, models)?.schema : schema;
  return hasFields(target) ? objectRows(target, models, []) : [];
}

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

// The request body schema, whatever its media type (JSON, multipart, ...).
export function requestSchema(operation) {
  return Object.values(operation.requestBody?.content ?? {})[0]?.schema;
}

// Path and query parameters as attribute rows. A parameter documents its
// description on the parameter itself, its type on its schema.
export function getParameterProperties(parameters, models) {
  return (parameters ?? [])
    .filter(param => param?.in === 'path' || param?.in === 'query')
    .map(param => propertyRow(
      param.name,
      { ...param.schema, description: param.description ?? param.schema?.description },
      !!param.required,
      models,
      []
    )[0]);
}

const isSuccess = code => /^2\d\d$/.test(code);

// The documented success response: 200 when present, otherwise the first 2xx.
export function successCode(responses) {
  return Object.keys(responses ?? {}).filter(isSuccess).sort()[0];
}

export function successResponse(responses) {
  const code = successCode(responses);
  return code ? responses[code] : undefined;
}

function errorEntries(code, response) {
  return Object.entries(response?.content?.['application/json']?.examples ?? {})
    .map(([message, example]) => ({
      code,
      message,
      description: formatDescription(example.description),
      example: example.value,
    }));
}

export function getErrors(responses, commonResponses = []) {
  const endpointErrors = Object.entries(responses ?? {})
    .filter(([code]) => !isSuccess(code))
    .flatMap(([code, response]) => errorEntries(code, response));
  const sharedErrors = commonResponses
    .filter(response => response?.['x-status-code'])
    .flatMap(response => errorEntries(response['x-status-code'], response));
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
