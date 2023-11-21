export default function transformToHarRequest(data) {
  if (typeof data !== 'object') {
    throw new Error('A data object is required');
  }

  const requiredFields = [ 'method', 'path'];
  requiredFields.forEach(field => {
    if (!(field in data)) {
      throw new Error(`Request is missing required field ${field}`);
    }
  });

  const harObject = {
    method: data.method,
    url: new URL(data.path, 'https://service.centrapay.com/').href,
    httpVersion: 'HTTP/2.0',
    headers: data.request?.headers && Object.entries(data.request.headers).map(([name, value]) => ({ name, value })),
  };
  if (data.request?.payload) {
    harObject.postData = {
      mimeType: 'application/json',
      text: JSON.stringify(data.request.payload)
    };
  }
  return harObject;
}
