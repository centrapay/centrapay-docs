export default {
  method: 'POST',
  path: '/api/tokens',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      collectionId: 'Jaim1Cu1Q55uooxSens6yk',
      idempotencyKey: 'payment-de32dd90-b46c-11ea-93c3-83a333b86e7b',
      externalId: '23403283262'
    },
  },
  response: {
    id: 'pe32dd90-b46c-11ea-92828sa',
    accountId: 'WRhAxxWpTKb5U7pXyxQjjP',
    category: 'token',
    collectionId: 'Jaim1Cu1Q55uooxSens6yk',
    status: 'active',
    createdAt: '2021-01-17T18:00:23.000Z',
    activeFrom: '2021-01-17T18:00:23.000Z',
    expiresAt: '2022-01-18T18:00:23.000Z',
    liveness: 'test',
    createdBy: 'crn:1234abc:api-key:MyAssetIssuerKey',
    description: 'My Cafe Token',
    issuerImg: 'https://static.centrapay.com/assets/brands/centraperk/logo.png',
    img: 'https://static.centrapay.com/assets/brands/centraperk/cafe-token.png',
    issuer: 'Centraperk Cafe',
    issuerWebsite: 'www.centraperk-cafe.com',
    type: 'centrapay.token.test',
    externalId: '23403283262'
  }
};
