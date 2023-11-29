export default {
  method: 'POST',
  path: '/payments/api/requests.create',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      merchantId: 'b0792018-6efc-4bca-a148-83bc57ff75b9',
      clientId: 'b80c361f-805a-405c-b0af-366d3b5bd4ef',
      amount: '300',
      asset: 'NZD',
    },
  },
};
