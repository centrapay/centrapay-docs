---
layout: default
grand_parent: API Reference
parent: Assets
title: Assets
nav_order: 1
permalink: /api/assets
redirect_from:
  - /assets/
  - /assets/asset-categories
  - /api/asset-categories
---

# Assets
{:.no_toc}

Centrapay digital assets are resources that represent the ability for a
Centrapay account to perform transactions where value is exchanged. Assets can
be spent to satisfy [Payment Requests][], withdrawn to a bank account via
[Funds Transfers][] and sent to other Centrapay users via [Asset Transfers][].

Assets are categorized as either Money, Gift Cards or Tokens. Depending on its
asset category, an asset will have different attributes available and different
rules governing how it can be obtained, shared or spent.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Asset

All assets have the following fields along with the additional fields that are
specific to its category.


{% h4 Required Fields %}

| Field       | Type               | Description                                       |
|:------------|:-------------------|:--------------------------------------------------|
| id          | String             | The asset's unique identifier.                    |
| accountId   | String             | The asset's owning Centrapay account id.          |
| category    | String             | Asset category ("money", "giftcard", or "token"). |
| type        | String             | Asset type id used by payment option asset types. |
| liveness    | String             | Either "main" (live payments allowed) or "test".  |
| description | String             | Displayable asset description.                    |
| createdAt   | {% dt Timestamp %} | Date when the asset was created or issued.        |
| status      | String             | "active" if the asset can be used for payments.   |


### Money

Money assets, being backed by real currency, are the most flexible asset types.
Money is accepted for most payment requests, can be sent in arbitrary amounts
and does not expire.

Money assets have the following fields along with the base asset fields.

{% h4 Required Fields %}

| Field    | Type               | Description                                                          |
|:---------|:-------------------|:---------------------------------------------------------------------|
| currency | String             | Currency code, eg "NZD"                                              |
| balance  | {% dt BigNumber %} | Current balance in the currency's smallest denomination (ie. cents). |




### Gift Cards

Gift cards are similar to money but have greater spending restrictions and are
not always backed by real currency. Gift cards usually have an expiry date, are
typically tied to a small number of merchants, and can only be sent in their
entirety.

Gift cards have the following fields along with the base asset fields.

{% h4 Required Fields %}

| Field          | Type           | Description                                                          |
|:---------------|:---------------|:---------------------------------------------------------------------|
| issuer         | String         | The identifier for the issuer of the gift card.                      |
| currency       | String         | Currency code, eg "NZD"                                              |
| balance        | {% dt BigNumber %} | Current balance in the currency's smallest denomination (ie. cents). |
| initialBalance | {% dt BigNumber %} | The balance when the asset was created.                              |

{% h4 Optional Fields %}

| Field            | Type               | Description                                                              |
|:-----------------|:-------------------|:-------------------------------------------------------------------------|
| externalId       | String             | The asset identifier from the issuing system.                            |
| expiresAt        | {% dt Timestamp %} | The date when the asset expires.                                         |
| balanceUpdatedAt | {% dt Timestamp %} | The date when the balance was last observed to be updated.               |
| img              | String             | **EXPERIMENTAL** The img URL of the gift card.                           |
| brandName        | String             | **EXPERIMENTAL** The name of the brand that the gift card belongs to.    |
| brandImg         | String             | **EXPERIMENTAL** The img URL of the brand that the gift card belongs to. |
| brandWebsite     | String             | **EXPERIMENTAL** The URL of the brand that the gift card belongs to.     |
| issuerWebsite    | String             | **EXPERIMENTAL** The URL of the issuer of the gift card.                 |



### Tokens (EXPERIMENTAL)

Tokens are assets which can be spent only once. They are usually tied to a
small set of merchants and have an expiry date. Token value may be set in
multiple currencies and is the same for all tokens of the same type.

Tokens have the following fields along with the base asset fields.

{% h4 Required Fields %}

| Field | Type  | Description                                                                                  |
|:------|:------|:---------------------------------------------------------------------------------------------|
| value | Array | The [Monetary Amounts][] representing the token's nominal value in its supported currencies. |

{% h4 Optional Fields %}

| Field     | Type               | Description                                |
| :-------  | :------------      | :----------------------------------------- |
| validFrom | {% dt Timestamp %} | The date when the asset becomes spendable. |
| expiresAt | {% dt Timestamp %} | The date when the asset expires.           |


## Operations

### Get Asset by id

{% reqspec %}
  GET '/api/assets/{assetId}'
  auth 'api-key'
  path_param 'assetId', 'L75M3L56N2PtBSt8g7uXLU'
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "category": "giftcard",
  "type": "epay.nzd.main",
  "issuer": "ezipay",
  "externalId": "23403283262",
  "description": "$60 Acme Giftcard",
  "initialBalance": "6000",
  "balance": "6000",
  "balanceUpdatedAt": "2021-01-01T00:00:00.000Z",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```

### List Assets for Account

{% reqspec %}
  GET '/api/accounts/{accountId}/assets'
  auth 'api-key'
  path_param 'accountId', 'Te2uDM7xhDLWGVJU3nzwnh'
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "items": [
    {
      "id": "L75M3L56N2PtBSt8g7uXLU",
      "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
      "category": "giftcard",
      "type": "epay.nzd.main",
      "issuer": "ezipay",
      "externalId": "23403283262",
      "description": "$60 Acme Giftcard",
      "initialBalance": "6000",
      "balance": "6000",
      "balanceUpdatedAt": "2021-01-01T00:00:00.000Z",
      "expiresAt": "2020-12-31T00:00:00.000Z",
      "createdAt": "2020-05-01T12:30:00.000Z"
    },
    {
      "id": "3aKubx3wr9cUHFecRq5nFL",
      "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
      "ledgerId": "centrapay.nzd.main",
      "type": "centrapay.nzd.main",
      "category": "money",
      "currency": "NZD",
      "balance": "2000"
    },
    {
      "id": "Aj7rtHmd7rDeWoJgw9MPHe",
      "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
      "type": "cca.coke.main",
      "description": "Coke™ Token",
      "category": "token",
      "value": [
        {
          "currency": "NZD",
          "amount": "400"
        }
      ],
      "expiresAt": "2020-12-31T00:00:00.000Z",
      "createdAt": "2020-05-01T12:30:00.000Z"
    }
  ]
}
```


### Archive Asset (EXPERIMENTAL)

Archive supported asset types by asset id. Currently only gift cards may be archived.

{% reqspec %}
  POST '/api/assets/{assetId}/archive'
  auth 'api-key'
  path_param 'assetId', 'L75M3L56N2PtBSt8g7uXLU'
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "category": "giftcard",
  "type": "epay.nzd.main",
  "issuer": "ezipay",
  "externalId": "23403283262",
  "description": "$60 Acme Giftcard",
  "initialBalance": "6000",
  "balance": "0",
  "balanceUpdatedAt": "2021-01-01T00:00:00.000Z",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "status": "archived"
}
```

{% h4 Error Responses %}

| Status | Code                    | Description                                         |
|:-------|:------------------------|:----------------------------------------------------|
| 403    | UNSUPPORTED_ASSET_TYPE  | Asset type can not be archived                      |


[Monetary Amounts]: {% link api/data-types.md %}#monetary
[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[Funds Transfers]: {% link api/bank-accounts/funds-transfers.md %}
[Asset Transfers]: {% link api/assets/asset-transfers.md %}
