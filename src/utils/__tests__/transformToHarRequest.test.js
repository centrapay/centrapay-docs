import transformToHarRequest from '../transformToHarRequest';

describe('transformToHarRequest', () => {
  it('transforms request with no payload', () => {
    const data = {
      method: 'GET',
      path: '/example',
      request: {
        headers: {
          'X-Api-Key': '<TOKEN>',
        }
      },
    };

    const expected = {
      method: 'GET',
      url: 'https://service.centrapay.com/example',
      httpVersion: 'HTTP/2.0',
      headers: [
        {
          name: 'X-Api-Key',
          value: '<TOKEN>'
        }
      ],
    };

    expect(transformToHarRequest(data)).toEqual(expected);
  });

  it('transforms request with payload', () => {
    const data = {
      method: 'POST',
      path: '/example',
      request: {
        headers: {
          'X-Api-Key': '<TOKEN>',
          'Content-Type': 'application/json',
        },
        payload: { key: 'value' },
      },
    };

    const expected = {
      method: 'POST',
      url: 'https://service.centrapay.com/example',
      httpVersion: 'HTTP/2.0',
      headers: [
        {
          name: 'X-Api-Key',
          value: '<TOKEN>'
        },
        {
          name: 'Content-Type',
          value: 'application/json'
        }
      ],
      postData: {
        mimeType: 'application/json',
        text: '{\"key\":\"value\"}',
      }
    };
    expect(transformToHarRequest(data)).toEqual(expected);
  });

  it('transforms request with query string', () => {
    const data = {
      method: 'GET',
      path: '/example',
      request: {
        queryString: {
          foo: 'bar',
          baz: 'boo',
        }
      },
    };

    const expected = {
      method: 'GET',
      url: 'https://service.centrapay.com/example',
      httpVersion: 'HTTP/2.0',
      queryString: [
        {
          name: 'foo',
          value: 'bar'
        },
        {
          name: 'baz',
          value: 'boo'
        }
      ],
    };
    expect(transformToHarRequest(data)).toEqual(expected);
  });

  it('can set custom base URL', () => {
    const data = {
      method: 'GET',
      baseUrl: 'https://my.custom.url.me',
      path: '/example',
    };

    const expected = {
      method: 'GET',
      url: 'https://my.custom.url.me/example',
      httpVersion: 'HTTP/2.0',
    };
    expect(transformToHarRequest(data)).toEqual(expected);
  });

  it('transforms request without headers', () => {
    const data = {
      method: 'GET',
      path: '/example',
    };

    const expected = {
      method: 'GET',
      url: 'https://service.centrapay.com/example',
      httpVersion: 'HTTP/2.0',
    };

    expect(transformToHarRequest(data)).toEqual(expected);
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
    it(name, () => expect(() => transformToHarRequest(data)).toThrow());
  });
});
