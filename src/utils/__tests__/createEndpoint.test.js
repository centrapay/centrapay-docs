import createEndpoint from '../createEndpoint.js';

describe('createEndpoint', () => {
  it('creates a curl snippet with payload', () => {
    const endpoint = createEndpoint({
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
    expect(endpoint.method).toBe('POST');
    expect(endpoint.path).toBe('/api/test');
    expect(endpoint.requests.curl).toMatchSnapshot();
  });

  it('creates a curl snippet without payload', () => {
    const endpoint = createEndpoint({
      method: 'POST',
      path: '/api/test',
      request: {
        headers: {
          'X-Api-Key': '<TOKEN>',
          'Content-Type': 'application/json',
        },
      }
    });
    expect(endpoint.requests.curl).toMatchSnapshot();
  });

  it('creates a curl snippet without headers or payload', () => {
    const endpoint = createEndpoint({
      method: 'POST',
      path: '/api/test',
    });
    expect(endpoint.requests.curl).toMatchSnapshot();
  });

  const invalidScenarios = [
    {
      name: 'method is not defined',
      data: { path: '/example' }
    },
    {
      name: 'path is not defined',
      data: { method: 'POST' }
    },
    {
      name: 'data is empty',
      data: {}
    },
    {
      name: 'data is undefined',
      data: undefined,
    },
    {
      name: 'data is a string',
      data: ''
    },
  ];

  invalidScenarios.forEach(({ name, data }) => {
    it(name, () => expect(() => createEndpoint(data)).toThrow());
  });
});