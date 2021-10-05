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

| Field          | Type   | Description                          |
| :------------  | :----- | :----------------------------------- |
| paymentOptions | Array  | Array of [Payment Option Configs][]. |


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

| Field              | Type   | Description                                                                                                  |
| :----------------- | :----- | :----------------------------------------------------------------------------------------------------------- |
| walletId           | String | Merchant's Centrapay Settlement Wallet to receive payments. Required for `centrapay.nzd` types.              |
| terminalId         | String | Merchant's Epay terminal id.                                                                                 |
| wavesPublicAddress | String | Merchant's public waves address. Required for `zap.main` types.                                              |

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

{% json %}
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
{% endjson %}

{% h4 Error Responses %}

| Status |          Code                     |          Description                                  |
| :----- | :---------------------------------| :-----------------------------------------------------|
| 403    | {% break _ INVALID_WALLET_TYPE %} | `walletId` does not belong to a [Settlement Wallet][].|

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
  "paymentOptions": [
    {
      "type": "pocketvouchers"
    }
  ]
}
{% endjson %}

### Get the default Merchant Config **EXPERIMENTAL**

If a merchant config does not already exist for the merchant, one is created.

{% reqspec %}
  GET '/api/merchants/{merchantId}/default-configs'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

{% json %}
{
  "id": "5ee168e8597be5002af7b454",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
      "type": "centrapay.nzd.main",
      "walletId": "1234c486308f3f0a23f0f92b"
    }
  ]
}
{% endjson %}

### List Merchant Configs

{% reqspec %}
  GET '/api/merchants/{merchantId}/configs/'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

{% json %}
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
      { type: 'centrapay.nzd.main', walletId: '1234c486308f3f0a23f0f92b' }
    ]
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "5ee168e8597be5002af7baed",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
      "type": "bitcoin.main"
    },
    {
      "type": "centrapay.nzd.main",
      "walletId": "1234c486308f3f0a23f0f92b"
    }
  ]
}
{% endjson %}

{% h4 Error Responses %}

| Status |          Code                     |          Description                                  |
| :----- | :---------------------------------| :-----------------------------------------------------|
| 403    | {% break _ INVALID_WALLET_TYPE %} | `walletId` does not belong to a [Settlement Wallet][].|


[Payment Request]: {% link api/payment-requests/payment-requests.md %}
[Payment Option Configs]: #payment-option-config
[Asset Types]: {% link api/assets/asset-types.md %}
[Settlement Wallet]: {% link api/assets/wallets.md %}#settlement-wallets
