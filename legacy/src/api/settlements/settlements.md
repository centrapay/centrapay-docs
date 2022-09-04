---
layout: default
grand_parent: API Reference
parent: Settlements
title: Settlements
nav_order: 1
permalink: /api/settlements
redirect_from:
  - /settlements
---

# Settlements
{:.no_toc}

A settlement is created from completed [Payment Requests][] over a specified period for each supported [Asset Type][] for each [Merchant][].

Settlements can only be created if the merchant has a [Settlement Config][].

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models
### Settlement

{% h4 Mandatory Fields %}

|       Field       |        Type        |                                        Description                                        |
| :---------------- | :----------------- | :---------------------------------------------------------------------------------------- |
| id                | String             | The unique identifier for the settlement.                                                 |
| status            | String             | The status of the settlement.                                                             |
| assetType         | String             | The [Asset Type] being settled.                                                           |
| currency          | String             | The settlement currency.                                                                  |
| createdAt         | {% dt Timestamp %} | When the Settlement was created.                                                          |
| createdBy         | {% dt CRN %}       | The User or API Key that created the Settlement.                                          |

{% h4 Optional Fields %}

|           Field           |        Type        |                                     Description                                   |
| :------------------------ | :----------------- | :-------------------------------------------------------------------------------- |
| settledAt                 | {% dt Timestamp %} | The time when settlement was completed.                                           |
| settledBy                 | {% dt CRN %}       | The User or API Key that completed the Settlement.                                |
| settlementAmount          | {% dt BigNumber %} | The total amount of the settlement.                                               |
| settlementBankAccountId   | String             | The ID of the bank account used for settlement.                                   |

## Operations
### List Settlements

{% reqspec %}
  GET '/api/merchants/{merchantId}/settlements'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "items": [
    {
      "id": "89028sh9308f590260d9a07f",
      "status": "confirmed",
      "assetType": "centrapay.nzd.main",
      "currency": "NZD",
      "createdAt": "2021-11-12T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "settledAt": "2021-11-13T11:59:59.999Z",
      "settledBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "settlementAmount": "2500",
      "settlementBankAccountId": "67e0c486308f590260d9a139",
    },
    {
      "id": "9ds2cs89028sh90260d9f91h",
      "status": "awaiting-confirmation",
      "assetType": "centrapay.nzd.main",
      "currency": "NZD",
      "createdAt": "2021-11-13T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "settlementAmount": "2200",
      "settlementBankAccountId": "67e0c486308f590260d9a139",
    }
  ]
}
{% endjson %}

[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[Asset Type]: {% link api/assets/asset-types.md %}#supported-asset-types %}
[Merchant]: {% link api/merchants/merchants.md %}
[Account]: {% link api/accounts/accounts.md %}
[Settlement Config]: {% link api/merchants/merchants.md %}#settlement-config
