export default {
  method: 'GET',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/bank-accounts',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      id: 'XZbPLViMzekVBbF7QMqgaY',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      status: 'created',
      bankAccountNumber: '02-0500-0568903-097',
      bankAccountName: 'Pocket Money',
      directDebitAuthorized: false,
      bankRegion: 'nz',
      createdBy: 'crn::user:57142ecc-e5e4-456a-8312-1fad4fdef3c7',
      createdAt: '2022-04-19T05:43:40.425Z',
      verified: false,
      modifiedBy: 'crn::user:57142ecc-e5e4-456a-8312-1fad4fdef3c7',
      modifiedAt: '2022-04-19T05:43:40.425Z',
      approvals: [

      ],
      type: 'quartz',
      test: true
    },
    {
      id: '3Kfdm8cuW1W6f8AoWJREs4',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      status: 'created',
      bankAccountNumber: '00-1213-1231299-999',
      bankAccountName: 'Jean',
      directDebitAuthorized: false,
      bankRegion: 'nz',
      createdBy: 'crn::user:57142ecc-e5e4-456a-8312-1fad4fdef3c7',
      createdAt: '2022-02-22T03:27:57.138Z',
      verified: false,
      modifiedBy: 'crn::user:57142ecc-e5e4-456a-8312-1fad4fdef3c7',
      modifiedAt: '2022-02-22T03:27:57.138Z',
      approvals: [
        {
          type: 'settlement',
          status: 'pending',
          updatedAt: '2021-11-08T21:52:39.915Z'
        }
      ],
      type: 'centrapay'
    }
  ]
};
