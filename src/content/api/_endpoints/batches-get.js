export default {
  method: 'GET',
  path: '/api/batches/AVH5uG4gRLYK6YR8JyrViN',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    id: 'AVH5uG4gRLYK6YR8JyrViN',
    accountId: '1mdj7bj95gjo92r0ux6wfy69gj3h77',
    status: 'complete',
    type: 'farmlands-external-asset',
    url: 'https://azurebuckets.com/1234',
    test: true,
    count: '160000',
    errorCount: '1',
    errors: [
      {
        externalId: '69d64d80-f9bd-4057-bc5b-1c55685d995b',
        index: '1954',
        message: 'INVALID_BARCODE_LENGTH'
      }
    ]
  }
};
