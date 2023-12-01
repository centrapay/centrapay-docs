export default {
  method: 'PUT',
  path: '/api/managed-integrations/paypal-referral/DKTs3U38hdhfEqwF1JKoT2',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      enabled: true,
      params: {
        centrapayMerchantId: '5ffcaf432003060007b98343',
        email: 'test@centrapay.com'
      }
    },
  },
  response: {
    id: '5ee0c486308f590260d9a07f',
    type: 'paypal-referral',
    externalId: 'DKTs3U38hdhfEqwF1JKoT2',
    enabled: true,
    params: {
      centrapayMerchantId: '5ffcaf432003060007b98343',
      email: 'test@centrapay.com'
    },
    status: 'provisioning',
    claimedByAccountId: 'Jaim1Cu1Q55uooxSens6yk',
    claimedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    claimedAt: '2020-06-12T01:17:46.499Z',
    inProgress: true,
    createdAt: '2020-06-11T01:17:46.499Z',
    createdBy: 'crn:BIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    updatedAt: '2020-06-12T01:17:46.499Z',
    updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey'
  }
};
