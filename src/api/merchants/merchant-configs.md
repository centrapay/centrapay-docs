---
layout: default
grand_parent: API Reference
parent: Merchants
title: Merchant Configs
permalink: /api/merchant-configs
---

# Merchant Configs
{:.no_toc}

A Merchant Config defines the available payment options for paying a [Payment Request][].

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

<span id="config-model"></span>
### Merchant Config

{% h4 Required Fields %}

| Field          | Type   | Description                   |
| :------------  | :----- | :---------------------------  |
| paymentOptions | Array  | Array of [Payment Options][]. |


### Payment Option Config

{% h4 Required Fields %}

| Field | Type   | Description                                                |
| :---- | :----- | :--------------------------------------------------------  |
| type  | String | Type of payment method. See supported payment types below. |

{% h4 Optional Fields %}

|       Field        |  Type  |                                                    Description                                                    |
| :----------------- | :----- | :---------------------------------------------------------------------------------------------------------------- |
| walletId           | String | Merchant's Centrapay wallet to receive payments. Required for `centrapay.nzd` types.                              |
| terminalId         | String | Merchant's Epay terminal id.                                                                                      |
| wavesPublicAddress | String | Merchant's public waves address. Required for `zap.main` types.                                                   |
| productCodes       | Array  | **EXPERIMENTAL** The product codes for specific gift cards acceptable for payment. Required for `epay.nzd` types. |

See [Asset Types][] for values that may be present in the `type` field.

{% warning Test payment options should never be used for live merchant configurations. %}

## Operations

### Create a Merchant Config

{% reqspec %}
  POST '/api/merchants/{merchantId}/configs/'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  body ({
    paymentOptions: [
      { type: 'centrapay.nzd.main', 'walletId': '1234c486308f3f0a23f0f92b' },
      { type: 'epay.nzd.main', 'terminalId': '11000021' },
      { type: 'pocketvouchers' },
    ]
  })
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "5ee168e8597be5002af7b454",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
        "type": "pocketvouchers"
    },
    {
      "type": "centrapay.nzd.test",
      "walletId": "1234c486308f3f0a23f0f92b"
    }
  ]
}
```

### Get a Merchant Config

{% reqspec %}
  GET '/api/merchants/{merchantId}/configs/{configId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  path_param 'configId', '5ee168e8597be5002af7b454'
{% endreqspec %}


{% h4 Example response payload %}

```json
{
  "id": "5ee168e8597be5002af7b454",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
      "type": "pocketvouchers"
    }
  ]
}
```

### List Merchant Configs

{% reqspec %}
  GET '/api/merchants/{merchantId}/configs/'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

```json
[
  {
    "id": "5ee168e8597be5002af7b454",
    "merchantId": "5ee0c486308f590260d9a07f",
    "paymentOptions": [
      {
        "type": "pocketvouchers"
      }
    ]
  },
  {
    "id": "5ee168e8597be5002af7baed",
    "merchantId": "5ee0c486308f590260d9a07f",
    "paymentOptions": [
      {
        "type": "test"
      }
    ]
  }
]
```

### Update a Merchant Config

{% reqspec %}
  PUT '/api/merchants/{merchantId}/configs/{configId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  path_param 'configId', '5ee168e8597be5002af7baed'
  body ({
    paymentOptions: [
      { type: 'bitcoin.main' },
      { type: 'centrapay.nzd.test', walletId: '1234c486308f3f0a23f0f92b' }
    ]
  })
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "5ee168e8597be5002af7baed",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
      "type": "bitcoin.main"
    },
    {
      "type": "centrapay.nzd.test",
      "walletId": "1234c486308f3f0a23f0f92b"
    }
  ]
}
```

[Payment Request]: {% link api/payment-requests/payment-requests.md %}
[Payment Options]: #payment-option
[Asset Types]: {% link api/assets/asset-types.md %}
