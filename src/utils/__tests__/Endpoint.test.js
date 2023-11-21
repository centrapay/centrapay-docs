import Endpoint from '../Endpoint.js';

describe('Endpoint', () => {
  describe('createRequest', () => {
    it('creates a curl snippet', () => {
      const snippet = Endpoint.create({
        method: 'POST',
        path: '/api/test',
        request: {
          headers: {
            'X-Api-Key': '<TOKEN>',
            'Content-Type': 'application/json',
          },
          payload: {
            foo: 'bar',
            bar: 'baz',
          }
        }
      });
      expect(snippet.method).toBe('POST');
      expect(snippet.path).toBe('/api/test');
      expect(snippet.requests.curl).toMatchSnapshot();
    });
  });
});
