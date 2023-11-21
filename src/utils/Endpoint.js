import transformToHarRequest from './transformToHarRequest';
import { HTTPSnippet } from 'httpsnippet';

const supportedClients = {
  curl: {
    targetId: 'shell',
    options: { short: true, indent: ' ', prettifyJson: true },
  },
};

class Endpoint {
  constructor(props) {
    this.path = props.path;
    this.method = props.method;
    this.requests = props.requests;
  }

  static create(data) {
    const harRequest = transformToHarRequest(data);

    const snippet = new HTTPSnippet(harRequest);
    const path = snippet.requests[0].uriObj.pathname;
    const method = snippet.requests[0].method;

    const requests = {};
    Object.entries(supportedClients).forEach(([clientId, details]) => {
      requests[clientId] = {
        lang: details.targetId,
        code: snippet.convert(details.targetId, clientId, details.options)
      };
    });

    return new Endpoint({
      path,
      method,
      requests,
    });
  }
};

export default Endpoint;
