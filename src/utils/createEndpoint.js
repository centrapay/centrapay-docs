import { HTTPSnippet } from 'httpsnippet';

// An empty indent keeps the curl continuation lines flush against the left edge.
const supportedClients = {
  curl: {
    targetId: 'shell',
    options: { short: true, indent: '' },
  },
};

// How a single quote is escaped inside a single quoted shell string.
const escapedQuote = '\'\\\'\'';

function validateData(data) {
  if (typeof data !== 'object') {
    throw new Error('A data object is required');
  }

  if (data.request !== undefined && typeof data.request !== 'object') {
    throw new Error('Request must be an object');
  }

  const requiredFields = [ 'method', 'path'];
  requiredFields.forEach(field => {
    if (!(field in data)) {
      throw new Error(`Request is missing required field ${field}`);
    }
  });
}

// eslint-disable-next-line complexity
function createSnippet(data) {
  const harObject = {
    method: data.method,
    url: new URL(data.path, 'https://service.centrapay.com/').href,
    httpVersion: 'HTTP/2.0',
  };
  if (data.request?.headers) {
    harObject.headers = Object.entries(data.request.headers).map(([name, value]) => ({ name, value }));
  }
  if (data.request?.queryString) {
    harObject.queryString = Object.entries(data.request.queryString).map(([name, value]) => ({ name, value }));
  }
  if (data.request?.payload) {
    harObject.postData = {
      mimeType: 'application/json',
      text: JSON.stringify(data.request.payload)
    };
  }
  if (data.request?.postData) {
    harObject.postData = data.request?.postData;
  }
  return new HTTPSnippet(harObject);
}

// httpsnippet breaks after the method and emits the body on a single line, so
// pull the url back onto the command and pretty print the payload in place.
function formatCurl(code) {
  return code
    .replace(/^(curl .*) \\\n(\S+)/, '$1 $2')
    .replace(/-d '(.*)'$/m, (match, body) => {
      try {
        const payload = JSON.parse(body.replaceAll(escapedQuote, '\''));
        return `-d '${JSON.stringify(payload, null, 2).replaceAll('\'', escapedQuote)}'`;
      } catch {
        return match;
      }
    });
}

function createRequests(data) {
  const snippet = createSnippet(data);
  const requests = {};
  Object.entries(supportedClients).forEach(([clientId, details]) => {
    requests[clientId] = {
      lang: details.targetId,
      code: formatCurl(snippet.convert(details.targetId, clientId, details.options))
    };
  });
  return requests;
}

function createResponse(data) {
  return JSON.stringify(data.response, null, 2);
}

export default function createEndpoint(data) {
  validateData(data);
  return {
    path: data.path,
    method: data.method,
    requests: createRequests(data),
    response: createResponse(data),
  };
}
