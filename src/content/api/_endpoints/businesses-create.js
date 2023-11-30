export default {
  method: 'POST',
  path: '/api/businesses',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      nzbn: '9429046246448',
      taxNumber: {
        value: '123-456-789',
        type: 'nz-gst'
      }
    },
  },
  response: {
    id: 'DKTs3U38hdhfEqwF1JKoT2',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    accountName: 'Centrapay',
    nzbn: '9429046246448',
    name: 'CENTRAPAY LIMITED',
    tradingName: 'CentraPay',
    companyNumber: '6340244',
    createdAt: '2020-06-12T01:17:46.499Z',
    updatedAt: '2020-06-12T01:17:46.499Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    taxNumber: {
      value: '123-456-789',
      type: 'nz-gst',
    },
    onboardingStatus: 'applied'
  }
};
