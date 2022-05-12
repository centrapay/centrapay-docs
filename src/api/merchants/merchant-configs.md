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

|     Field      |        Type        |                      Description                      |
| :------------- | :----------------- | :---------------------------------------------------- |
| paymentOptions | Array              | Array of [Payment Option Configs][].                  |
| createdAt      | {% dt Timestamp %} | When the Merchant Config was created.                 |
| createdBy      | {% dt CRN %}       | The User or API Key that created the Merchant Config. |
| updatedAt      | {% dt Timestamp %} | When the Merchant Config was updated.                 |
| updatedBy      | {% dt CRN %}       | The User or API Key that updated the Merchant Config. |


{% h4 Optional Fields %}

| Field               | Type  | Description                                                                                                         |
| :------------------ | :---- | :------------------------------------------------------------------------------------------------------------------ |
| allowedRedirectUrls | Array | **Experimental** Allowed prefixes for the `redirectUrl` property on Payment Requests created with this Config.      |


### Payment Option Config

{% h4 Required Fields %}

| Field | Type   | Description                                                |
| :---- | :----- | :--------------------------------------------------------  |
| type  | String | Type of payment method. See supported payment types below. |

{% h4 Optional Fields %}

|          Field          |  Type  |                                                                                Description                                                                                 |
| :---------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| walletId                | String | Merchant's Centrapay Settlement Wallet to receive payments. Optional for `centrapay.nzd` types, if not supplied then a settlement wallet may be created and then assigned. |
| assetId                 | String | Merchant's Centrapay Settlement Asset to receive payments. Optional for `kete.nzd` and `quartz.nzd` types, if not supplied then a settlement asset may be created and then assigned.        |
| terminalId              | String | Merchant's Epay terminal id.                                                                                                                                               |
| wavesPublicAddress      | String | Merchant's public waves address. Required for `zap.main` types.                                                                                                            |
| paypalMerchantAccountId | String | Id of the PayPal merchants account. Required for `paypal.usd` and `venmo.usd` types.                                                                                       |
| paypalStoreId           | String | Id of the PayPal merchants store. Required for `paypal.usd` and `venmo.usd`  types.                                                                                        |
| farmlandsMerchantNumber           | String | Id of the Farmlands merchant that funds will be transferred to.                                                                                        |

See [Asset Types][] for values that may be present in the `type` field.

{% warning Test payment options should never be used for live merchant configurations. %}

## Operations

### Create a Merchant Config

{% reqspec %}
  POST '/api/merchants/{merchantId}/configs'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  body ({
    paymentOptions: [
      { type: 'centrapay.nzd.main', 'walletId': '1234c486308f3f0a23f0f92b' },
      { type: 'epay.nzd.main', 'terminalId': '11000021' },
      { type: 'pocketvouchers' },
      {
        type: 'farmlands.nzd.main',
        farmlandsMerchantNumber: 'DbgY2SyD5M85zkePJjsQEf'
      }
    ]
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "5ee168e8597be5002af7b454",
  "merchantId": "5ee0c486308f590260d9a07f",
  "createdAt": "2021-11-12T01:17:46.499Z",
  "updatedAt": "2021-11-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "paymentOptions": [
    {
        "type": "pocketvouchers"
    },
    {
      "type": "centrapay.nzd.test",
      "walletId": "1234c486308f3f0a23f0f92b"
    },
    {
      "type": "farmlands.nzd.main",
      "farmlandsMerchantNumber": "DbgY2SyD5M85zkePJjsQEf"
    }
  ]
}
{% endjson %}

{% h4 Error Responses %}

| Status |               Code                |                                         Description                                          |
| :----- | :-------------------------------- | :------------------------------------------------------------------------------------------- |
| 403    | {% break _ INVALID_WALLET_TYPE %} | `walletId` does not belong to a [Settlement Wallet][].                                       |
| 403    | {% break _ LIVENESS_MISMATCH %}   | Only [Merchants] with the `test` flag can have merchant configs with test assets, vice versa |

### Get a Merchant Config

{% reqspec %}
  GET '/api/merchants/{merchantId}/configs/{configId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  path_param 'configId', '5ee168e8597be5002af7b454'
{% endreqspec %}


{% h4 Example response payload %}

{% json %}
{
  "id": "5ee168e8597be5002af7b454",
  "merchantId": "5ee0c486308f590260d9a07f",
  "createdAt": "2021-11-12T01:17:46.499Z",
  "updatedAt": "2021-11-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "paymentOptions": [
    {
      "type": "pocketvouchers"
    },
    {
      "type": "farmlands.nzd.main",
      "farmlandsMerchantNumber": "DbgY2SyD5M85zkePJjsQEf"
    }
  ]
}
{% endjson %}

### List Merchant Configs

{% reqspec %}
  GET '/api/merchants/{merchantId}/configs'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

{% json %}
[
  {
    "id": "5ee168e8597be5002af7b454",
    "merchantId": "5ee0c486308f590260d9a07f",
    "createdAt": "2021-09-12T01:17:46.499Z",
    "updatedAt": "2021-09-12T01:17:46.499Z",
    "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
    "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
    "paymentOptions": [
      {
        "type": "pocketvouchers"
      },
      {
        "type": "farmlands.nzd.main",
        "farmlandsMerchantNumber": "DbgY2SyD5M85zkePJjsQEf"
      }
    ]
  },
  {
    "id": "5ee168e8597be5002af7baed",
    "merchantId": "5ee0c486308f590260d9a07f",
    "createdAt": "2021-11-12T01:17:46.499Z",
    "updatedAt": "2021-11-12T01:17:46.499Z",
    "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
    "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
    "paymentOptions": [
      {
        "type": "test"
      }
    ]
  }
]
{% endjson %}

### Update a Merchant Config

{% reqspec %}
  PUT '/api/merchants/{merchantId}/configs/{configId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  path_param 'configId', '5ee168e8597be5002af7baed'
  body ({
    paymentOptions: [
      { type: 'bitcoin.main' },
      { type: 'centrapay.nzd.test', walletId: '1234c486308f3f0a23f0f92b' },
      {
        type: 'farmlands.nzd.main',
        farmlandsMerchantNumber: 'DbgY2SyD5M85zkePJjsQEf'
      }
    ]
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "5ee168e8597be5002af7baed",
  "merchantId": "5ee0c486308f590260d9a07f",
  "createdAt": "2021-09-12T01:17:46.499Z",
  "updatedAt": "2021-12-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "paymentOptions": [
    {
      "type": "bitcoin.main"
    },
    {
      "type": "centrapay.nzd.test",
      "walletId": "1234c486308f3f0a23f0f92b"
    },
    {
      "type": "farmlands.nzd.main",
      "farmlandsMerchantNumber": "DbgY2SyD5M85zkePJjsQEf"
    }
  ]
}
{% endjson %}

{% h4 Error Responses %}

| Status |               Code                |                                         Description                                          |
| :----- | :-------------------------------- | :------------------------------------------------------------------------------------------- |
| 403    | {% break _ INVALID_WALLET_TYPE %} | `walletId` does not belong to a [Settlement Wallet][].                                       |
| 403    | {% break _ LIVENESS_MISMATCH %}   | Only [Merchants] with the `test` flag can have merchant configs with test assets, vice versa |


[Payment Request]: {% link api/payment-requests/payment-requests.md %}
[Payment Option Configs]: #payment-option-config
[Asset Types]: {% link api/assets/asset-types.md %}
[Settlement Wallet]: {% link api/assets/wallets.md %}#settlement-wallets
[Merchants]: {% link api/merchants/merchants.md %}
