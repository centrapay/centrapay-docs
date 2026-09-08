export default {
  method: 'POST',
  path: '/api/businesses/onboard',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      legalName: 'Centrapay Online Limited',
      tradingName: 'Centrapay Online Store',
      contactEmail: 'admin@centraonline.example',
      contactName: 'Alice Anderson',
      externalId: 'ext-online-001',
      taxNumber: {
        value: '123-456-789',
        type: 'nz-gst'
      },
      merchant: {
        name: 'Centrapay Online Store',
        categoryCode: '5999',
        type: 'e-commerce',
        contactName: 'Carol Chen',
        contactEmail: 'ecommerce@centraonline.example',
        contactPhone: '6491234568',
        redirectUrls: [
          'https://centraonline.example/checkout/callback'
        ]
      },
      assetProgram: {
        assetProgramId: 'YGRo6TYYSxH3js7',
        params: {
          settlementAccountNumber: '12-3456-7890123-00',
          externalMerchantId: 'ext-merchant-online-789'
        }
      },
      salesChannels: [
        {
          params: {
            vendor: 'shopify',
            deviceId: 'centraonline.myshopify.com'
          }
        }
      ],
      metadata: {
        referenceId: 'ref-67890'
      }
    },
  },
  response: {
    id: 'bo_2b3c4d5e6f7g8h9i0j1k',
    legalName: 'Centrapay Online Limited',
    tradingName: 'Centrapay Online Store',
    contactEmail: 'admin@centraonline.example',
    contactName: 'Alice Anderson',
    externalId: 'ext-online-001',
    taxNumber: {
      value: '123-456-789',
      type: 'nz-gst'
    },
    merchant: {
      name: 'Centrapay Online Store',
      categoryCode: '5999',
      type: 'e-commerce',
      contactName: 'Carol Chen',
      contactEmail: 'ecommerce@centraonline.example',
      contactPhone: '6491234568',
      redirectUrls: [
        'https://centraonline.example/checkout/callback'
      ]
    },
    assetProgram: {
      assetProgramId: 'YGRo6TYYSxH3js7',
      params: {
        settlementAccountNumber: '12-3456-7890123-00',
        externalMerchantId: 'ext-merchant-online-789'
      }
    },
    salesChannels: [
      {
        params: {
          vendor: 'shopify',
          deviceId: 'centraonline.myshopify.com'
        }
      }
    ],
    metadata: {
      referenceId: 'ref-67890'
    },
    status: 'pending',
    createdAt: '2025-07-25T10:30:00.000Z',
    createdBy: 'Jaim1Cu1Q55uooxSens6yk'
  }
};
