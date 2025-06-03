export default {
  method: 'POST',
  path: '/api/connections',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      merchantId: 'abcde',
    },
  },
  response: {
    id: "1234",
    createdBy: "crn:1234abc:api-key:MyAPIKey",
    createdByAccountName: "Salespoint",
    createdAt: "2021-08-25T00:02:49.488Z",
    status: "created",
    merchantId: "abcde"
  }
};
