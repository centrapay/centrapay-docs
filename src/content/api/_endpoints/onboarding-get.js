export default {
  method: 'GET',
  path: '/api/businesses/onboard/bo_1a2b3c4d5e6f7g8h9i0j',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    id: 'bo_1a2b3c4d5e6f7g8h9i0j',
    legalName: 'Centrapay Cafe Limited',
    tradingName: 'Centrapay Cafe',
    contactEmail: 'admin@centracafe.example',
    contactName: 'Alice Anderson',
    externalId: 'ext-cafe-001',
    taxNumber: {
      value: '123-456-789',
      type: 'nz-gst'
    },
    merchant: {
      name: 'Centrapay Cafe',
      categoryCode: '5812',
      type: 'physical',
      contactName: 'Bob Brown',
      contactEmail: 'manager@centracafe.example',
      contactPhone: '6491234567',
      location: {
        street: '123 Example Street',
        suburb: 'Newtown',
        city: 'Wellington',
        state: 'Wellington',
        postCode: '6021',
        country: 'NZ'
      }
    },
    assetProgram: {
      assetProgramId: 'YGRo6TYYSxH3js7',
      params: {
        settlementAccountNumber: '12-3456-7890123-00',
        chargeAccountNumber: '12-3456-7890123-01',
        externalMerchantId: 'ext-merchant-789'
      }
    },
    salesChannels: [
      {
        params: {
          vendor: 'example vendor',
          reseller: 'example reseller',
          deviceId: 'device-001',
          serialNumber: 'SN123456',
          deviceModel: 'Example Terminal Model X1'
        }
      },
      {
        params: {
          vendor: 'example vendor',
          reseller: 'example reseller',
          deviceId: 'device-002',
          serialNumber: 'SN123457',
          deviceModel: 'Example Terminal Model X1'
        }
      }
    ],
    metadata: {
      referenceId: 'ref-12345',
      notes: 'Onboarding request submitted via partner portal'
    },
    status: 'pending',
    createdAt: '2025-07-25T10:30:00.000Z',
    createdBy: 'Jaim1Cu1Q55uooxSens6yk'
  }
};
