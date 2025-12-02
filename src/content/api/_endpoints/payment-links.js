export default {
  method: 'GET',
  path: '/api/connections/1234/authorize',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    }
  },
  response: {
    id: '1234',
    status: 'created',
    name: 'Front Checkout',
    merchantId: 'b040b262ddb80ea8',
    paymentRequestId: '12d22ece51eb033',
    createdBy: 'crn:1234abc:api-key:MyAPIKey',
    createdAt: '2021-08-25T00:02:49.488Z',
    updatedBy: 'crn:1234abc:api-key:MyAPIKey',
    updatedAt: '2022-08-25T00:02:49.488Z',
  }
};
