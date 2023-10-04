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
specific to its category. Assets which don't have a category are considered
**EXPERIMENTAL** and the model may change.


{% h4 Fields %}

|    Field    |        Type        |                                           Description                                           |
| :---------- | :----------------- | :---------------------------------------------------------------------------------------------- |
| id          | String             | The Asset's unique identifier.                                                                  |
| accountId   | String             | The Asset's owning Centrapay Account id.                                                        |
| category    | String {% opt %}   | Asset category ("money", "giftcard", "token").                                                  |
| type        | String             | [Asset Type][] id used by payment option asset types.                                           |
| liveness    | String             | Either "main" (live payments allowed) or "test".                                                |
| description | String             | Displayable asset description.                                                                  |
| createdAt   | {% dt Timestamp %} | Date when the asset was created or issued.                                                      |
| status      | String             | "active" if the asset can be used for payments.                                                 |
| meta        | Object {% opt %}   | **EXPERIMENTAL** Additional data that may only appear in the [Get Asset](#get-asset) response. |

<a name="money">
### Money

Money assets, being backed by real currency, are the most flexible asset types.
Money is accepted for most payment requests, can be sent in arbitrary amounts
and does not expire.

Money assets have the following fields along with the base asset fields.

{% h4 Fields %}

| Field             | Type               | Description                                                           |
|:------------------|:-------------------|:----------------------------------------------------------------------|
| currency          | String             | Currency code, eg "NZD"                                               |
| balance           | {% dt BigNumber %} | Current balance in the currency's smallest denomination (ie. cents).  |
| availableBalance  | {% dt BigNumber %} | The balance of the asset that is available for transfers or purchases.|
| settlement | Boolean {% opt %} | **EXPERIMENTAL** The asset is configured for [Settlements][].|


<a name="giftcards">
### Gift Cards

Gift cards are similar to money but have greater spending restrictions and are
not always backed by real currency. Gift cards usually have an expiry date, are
typically tied to a small number of merchants, and can only be sent in their
entirety.

Gift cards have the following fields along with the base asset fields.

{% h4 Fields %}

|      Field       |             Type             |                                          Description                                          |
| :--------------- | :--------------------------- | :-------------------------------------------------------------------------------------------- |
| issuer           | String                       | The identifier for the issuer of the gift card.                                               |
| currency         | String                       | Currency code, eg "NZD"                                                                       |
| balance          | {% dt BigNumber %}           | Current balance in the currency's smallest denomination (ie. cents).                          |
| availableBalance | {% dt BigNumber %}           | The balance of the asset that is available for transfers or purchases.                        |
| initialBalance   | {% dt BigNumber %}           | The balance when the asset was created.                                                       |
| externalId       | String {% opt %}             | The asset identifier from the issuing system.                                                 |
| expiresAt        | {% dt Timestamp %} {% opt %} | The date when the asset expires.                                                              |
| balanceUpdatedAt | {% dt Timestamp %} {% opt %} | The date when the balance was last observed to be updated.                                    |
| productCode      | String {% opt %}             | **EXPERIMENTAL** The unique code which must match a merchant's payment option for redemption. |
| img              | String {% opt %}             | **EXPERIMENTAL** The img URL of the gift card.                                                |
| brandName        | String {% opt %}             | **EXPERIMENTAL** The name of the brand that the gift card belongs to.                         |
| brandImg         | String {% opt %}             | **EXPERIMENTAL** The img URL of the brand that the gift card belongs to.                      |
| brandWebsite     | String {% opt %}             | **EXPERIMENTAL** The URL of the brand that the gift card belongs to.                          |
| issuerWebsite    | String {% opt %}             | **EXPERIMENTAL** The URL of the issuer of the gift card.                                      |



<a name="tokens">
### Tokens (EXPERIMENTAL)

Tokens are assets which can only be spent in full.

Every token is associated with a collection, which defines the branding and general rules for the tokens, such as active duration.

Tokens have the following fields along with the base asset fields.

{% h4 Fields %}

|     Field     |             Type             |                                                 Description                                                 |
| :------------ | :--------------------------- | :---------------------------------------------------------------------------------------------------------- |
| collectionId  | String                       | The [token collection][] that will govern the branding and redemption rules for the token.                  |
| createdBy     | {% dt CRN %}                 | The identity that created the activity.                                                                     |
| value         | Array {% opt %}              | The [Monetary Amounts][] representing the token's nominal value in its supported currencies. **DEPRECATED** |
| activeFrom    | {% dt Timestamp %} {% opt %} | The date when the asset becomes spendable.                                                                  |
| expiresAt     | {% dt Timestamp %} {% opt %} | The date when the asset expires.                                                                            |
| img           | String {% opt %}             | The img URL of the token.                                                                                   |
| issuer        | String {% opt %}             | The name of the [Business][] that issued the token.                                                           |
| issuerWebsite | String {% opt %}             | The URL of the issuer of the token.                                                                         |
| issuerImg     | String {% opt %}             | The img URL of the issuer that the token belongs to.                                                        |
| externalId    | String {% opt %}             | The asset identifier from the issuing system.                                                               |

## Operations

### Get Asset

{% reqspec %}
  GET '/api/assets/{assetId}'
  auth 'api-key'
  path_param 'assetId', 'L75M3L56N2PtBSt8g7uXLU'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "category": "giftcard",
  "type": "epay.nzd.main",
  "issuer": "ezipay",
  "externalId": "23403283262",
  "description": "$60 Acme Giftcard",
  "productCode": "23403",
  "initialBalance": "6000",
  "balance": "6000",
  "availableBalance": "6000",
  "balanceUpdatedAt": "2021-01-01T00:00:00.000Z",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
{% endjson %}

{% h4 Example response payload (public view - authorization not required) %}

{% json %}
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "issuer": "Centraperk Cafe",
  "description": "Free Coffee",
  "expiresAt": "2020-12-31T00:00:00.000Z",
	"img": "https://static.centrapay.com/assets/brands/centraperk/cafe-token.png",
	"liveness": "test"
}
{% endjson %}

### List Assets for Account

Returns a [paginated][] list of Assets for an account. This will not return archived assets.

{% reqspec %}
  GET '/api/accounts/{accountId}/assets'
  auth 'api-key'
  path_param 'accountId', 'Te2uDM7xhDLWGVJU3nzwnh'
  example {
    title 'List Assets for Account'
  }
  example {
    title 'List Assets for Account by externalId'
    query_param 'externalId', 'QZnc7ehZGub1PHAUBjzVxo'
  }
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
      "productCode": "23403",
      "initialBalance": "6000",
      "balance": "6000",
      "availableBalance": "6000",
      "balanceUpdatedAt": "2021-01-01T00:00:00.000Z",
      "expiresAt": "2020-12-31T00:00:00.000Z",
      "createdAt": "2020-05-01T12:30:00.000Z"
    },
    {
      "id": "WRhAxxWpTKb5U7pXyxQjjY",
      "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
      "category": "money",
      "type": "centrapay.nzd.main",
      "liveness": "main",
      "description": "NZD",
      "createdAt": "2021-01-01T00:00:00.000Z",
      "status": "active",
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
{% endjson %}

### Listing Asset Transactions **EXPERIMENTAL**

Returns a [paginated][] list of Asset Transactions. This endpoint is currently only supported for `quartz` asset types.

{% reqspec %}
  GET '/api/assets/{assetId}/transactions'
  path_param 'assetId', 'WRhAxxWpTKb5U7pXyxQjjY'
  auth 'api-key'
{% endreqspec %}


{% h4 Transaction Fields %}

|     Field      |       Type       |                                                 Description                                                  |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------- |
| ref            | String           | ID of the Centrapay resource that initiated this transaction.                                                |
| refType        | String           | Name of the Centrapay resource that initiated this transaction.                                              |
| type           | String           | Type of the Asset Transaction. Supported values are `increment-balance`, `decrement-balance` and `transfer`. |
| kind           | String           | Human readable value indicating the reason for this transaction.                                             |
| srcAssetId     | String {% opt %} | ID of the source asset if applicable.                                                                        |
| destAssetId    | String {% opt %} | ID of the destination asset if applicable.                                                                   |
| srcParty       | String {% opt %} | Display value for party providing funds if applicable. See note below.                                       |
| destParty      | String {% opt %} | Display value for party receiving funds if applicable. See note below.                                       |
| otherParty     | String {% opt %} | Display value for party providing or receiving funds if applicable. See note below.                          |
| amount         | String           | Amount of transaction in cents.                                                                              |
| activityType   | String           | Indicating whether the asset gained or lost value. Supported types are `value-in` and `value-out`.           |
| activityNumber | String           | Unique sequential Asset transaction number.                                                                  |

{% h4 Party Values %}

The "destParty" and "srcParty" are optionally provided only on transactions of
type `transfer`. Values may include a merchant name, user handle, masked user
email, masked user phone, or bank account.

The "otherParty" is optionally provided only on transactions of type
`increment-balance` and `decrement-balance`. Values may include bank account
number.

{% h4 Example response payload %}

{% json %}
{
  "items": [
    {
      "ref": "adRGJqMyMhmGfnDXasRZ",
      "type": "transfer",
      "kind": "refund",
      "refType": "payment-request",
      "assetId": "WRhAxxWpTKb5U7pXyxQjjY",
      "srcParty": "Coffee Ltd",
      "destParty": "crn::user:5a3b1ba7-d01k-409f-ld0a-jd81k0ald",
      "createdAt": "2022-03-31T20:36:08.562Z",
      "createdBy": "crn::service:payments-api",
      "srcAssetId": "Jd9a89ZESjjCuUD9DJD9Al",
      "destAssetId": "WRhAxxWpTKb5U7pXyxQjjY",
      "amount": "2000",
      "activityType": "value-in",
      "activityNumber": "3"
    },
    {
      "ref": "adRGJqMyMhmGfnDXasRZ",
      "type": "transfer",
      "kind": "payment",
      "refType": "payment-request",
      "assetId": "WRhAxxWpTKb5U7pXyxQjjY",
      "srcParty": "crn::user:5a3b1ba7-d01k-409f-ld0a-jd81k0ald",
      "destParty": "Coffee Ltd",
      "createdAt": "2022-03-31T20:35:54.717Z",
      "createdBy": "crn::service:payments-api",
      "srcAssetId": "WRhAxxWpTKb5U7pXyxQjjY",
      "destAssetId": "Jd9a89ZESjjCuUD9DJD9Al",
      "amount": "3000",
      "activityType": "value-out",
      "activityNumber": "2"
    },
    {
      "ref": "H4SZKwMcU9VCmnGEqDA7Mn",
      "type": "increment-balance",
      "kind": "topup",
      "refType": "topup",
      "assetId": "WRhAxxWpTKb5U7pXyxQjjY",
      "createdAt": "2022-03-31T02:37:47.207Z",
      "createdBy": "crn::application:rhea",
      "destAssetId": "WRhAxxWpTKb5U7pXyxQjjY",
      "amount": "7600",
      "activityType": "value-in",
      "activityNumber": "1"
    }
  ]
}
{% endjson %}

### Archive Asset

Archive supported asset types by asset id. Currently only gift cards may be archived.

{% reqspec %}
  POST '/api/assets/{assetId}/archive'
  auth 'api-key'
  path_param 'assetId', 'L75M3L56N2PtBSt8g7uXLU'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
{% endjson %}

{% h4 Error Responses %}

| Status | Code                    | Description                                         |
|:-------|:------------------------|:----------------------------------------------------|
| 403    | UNSUPPORTED_ASSET_TYPE  | Asset type can not be archived                      |


[Asset Type]: {% link api/assets/asset-types.md %}
[Monetary Amounts]: {% link api/data-types.md %}#monetary
[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[Funds Transfers]: {% link api/bank-accounts/funds-transfers.md %}
[Asset Transfers]: {% link api/assets/asset-transfers.md %}
[paginated]: {% link api/pagination.md %}
[Settlements]: {% link api/assets/wallets.md %}#settlement-wallets
[token collection]: {% link api/assets/tokens.md %}#token-collection
[Business]: {% link api/accounts/businesses.md %}
