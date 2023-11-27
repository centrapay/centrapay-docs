import { HTTPSnippet } from 'httpsnippet';

const supportedClients = {
  curl: {
    targetId: 'shell',
    options: { short: true, indent: ' ', prettifyJson: true },
  },
};

function validateData(data) {
  if (typeof data !== 'object') {
    throw new Error('A data object is required');
  }

  const requiredFields = [ 'method', 'path'];
  requiredFields.forEach(field => {
    if (!(field in data)) {
      throw new Error(`Request is missing required field ${field}`);
    }
  });
}

function createSnippet(data) {
  const harObject = {
    method: data.method,
    url: new URL(data.path, 'https://service.centrapay.com/').href,
    httpVersion: 'HTTP/2.0',
  };
  if (data.request?.headers) {
    harObject.headers = Object.entries(data.request.headers).map(([name, value]) => ({ name, value }));
  }
  if (data.request?.payload) {
    harObject.postData = {
      mimeType: 'application/json',
      text: JSON.stringify(data.request.payload)
    };
  }
  return new HTTPSnippet(harObject);
}

function createPayload({ payload, optionalFields = [] }) {
  const { required, optional } = payload;
  const result = { ...required };
  optionalFields.forEach(field => {
    if (optional[field] !== undefined) {
      result[field] = optional[field];
    }
  });
  return result;
}

function createRequests({ endpoint, optionalFields }) {
  const payload = createPayload({ payload: endpoint.request.payload, optionalFields });
  const snippet = createSnippet({ ...endpoint, request: { ...endpoint.request, payload }});
  const requests = {};
  Object.entries(supportedClients).forEach(([clientId, details]) => {
    requests[clientId] = {
      lang: details.targetId,
      code: snippet.convert(details.targetId, clientId, details.options)
    };
  });
  return requests;
}

export default function createEndpoint({ endpoint, optionalFields }) {
  validateData(endpoint);
  return {
    path: endpoint.path,
    method: endpoint.method,
    requests: createRequests({ endpoint, optionalFields }),
  };
}
