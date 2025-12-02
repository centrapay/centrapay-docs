export default {
  method: 'GET',
  path: '/api/payment-links/1234/archive',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    }
  },
  response: {
    id: '1234',
    name: 'Front Checkout',
    merchantId: 'b040b262ddb80ea8',
    status: 'archived',
    createdBy: 'crn:1234abc:api-key:MyAPIKey',
    createdAt: '2021-08-25T00:02:49.488Z',
    updatedBy: 'crn:1234abc:api-key:MyAPIKey',
    updatedAt: '2022-08-25T00:02:49.488Z',
  }
};
