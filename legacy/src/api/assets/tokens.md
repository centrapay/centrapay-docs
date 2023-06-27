---
layout: default
grand_parent: API Reference
parent: Assets
title: Tokens
permalink: /api/tokens
---

# Tokens
{:.no_toc}

Tokens are assets which can be spent only once. They are usually tied to a
small set of merchants and have an expiry date.

Tokens belong to a collection. A collection defines the redemption rules and
branding for all tokens under the collection.

Token value may be set in multiple currencies and is the same for all tokens in the same collection.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Token Collection
<a name="token-collection">
{% h4 Fields %}

|       Field       |                  Type                   |                                     Description                                     |
| :---------------- | :-------------------------------------- | :---------------------------------------------------------------------------------- |
| name              | String                                  | The display name of the collection.                                                 |
| accountId         | String                                  | The account that will own the collection.                                           |
| tokenExpiresAfter | [TokenExpiresAfter](#tokenexpiresafter) | The active duration of all tokens created from this collection.                     |
| type              | String                                  | The type of value exchanged when redeeming tokens, can be `product`                 |
| maxValue          | {% dt Monetary %} {% opt %}             | The maximum agreed value that any merchants will be settled for a token redemption. |

### TokenExpiresAfter
<a name="tokenExpiresAfter">

|  Field   |  Type  |                        Description                        |
| :------- | :----- | :-------------------------------------------------------- |
| period   | String | Supported values are `hour`, `day`, `week`, and `month` . |
| duration | String | Number of `period` until token expiration.                |

### Redemption Condition
{% h4 Fields %}

|      Field      |                     Type                      |                             Description                              |
| :-------------- | :-------------------------------------------- | :------------------------------------------------------------------- |
| merchantId      | String                                        | The identifier of the merchant that is accepting the collection.     |
| allowedProducts | [AllowedProducts](#allowedproducts) {% opt %} | List of allowed products, required for collections of type `product` |


### AllowedProducts
<a name="allowedProducts">

|  Field   |       Type        |                       Description                       |
| :------- | :---------------- | :------------------------------------------------------ |
| sku      | String            | The SKU of the product that is to be accepted.          |
| name     | String            | Display name of the product                             |
| maxValue | {% dt Monetary %} | The maximum value that the product can be redeemed for. |

### Token
{% h4 Fields %}

|     Field      |  Type  |                                                 Description                                                 |
| :------------- | :----- | :---------------------------------------------------------------------------------------------------------- |
| collectionId   | String | The [token collection](#token-collection) that will govern the branding and redemption rules for the token. |
| idempotencyKey | String | Client-supplied identifier that prevents double creation.                                                   |

## Operations
### Create Token Collection **EXPERIMENTAL**

{% reqspec %}
  POST '/api/collections'
  auth 'api-key'
  body ({
    "name": "Bread",
		"accountId": "T3y6hogYA4d612BExypWYH",
		"tokenExpiresAfter": {
			"period": "month",
			"duration": "1"
		},
		"maxValue": {
			"currency": "NZD",
			"amount": "400"
		},
		"type": "product",
  })
{% endreqspec %}

{% h4 Example response payload %}
{% json %}
{
  "id": "Xv990BzkgfoDS7bBls50pd",
  "name": "Bread",
	"accountId": "T3y6hogYA4d612BExypWYH",
  "tokenExpiresAfter": {
    "period": "month",
    "duration": "1",
  },
  "maxValue": {
		"currency": "NZD",
		"amount": "400",
	},
  "test": true,
	"type": "product",
	"status": "active",
	"createdBy": "crn::user:b657195e-dc2f-11ea-8566-e7710d592c99",
	"createdAt": "2021-05-12T04:30:11.001Z",
}
{% endjson %}  

### List Token Collections for Account **EXPERIMENTAL**

{% reqspec %}
  GET '/api/accounts/{accountId}/collections'
  auth 'api-key'
  path_param 'accountId', 'T3y6hogYA4d612BExypWYH'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "nextPageKey": "Collection#E9eXsErwA444qFDoZt5iLA|#Collection",
	"items": [{
		"id": "Xv990BzkgfoDS7bBls50pd",
		"name": "Bread",
		"accountId": 'T3y6hogYA4d612BExypWYH',
		"tokenExpiresAfter": {
	    "period": 'month',
	    "duration": '1',
	  },
		"maxValue": {
			"currency": "NZD",
			"amount": "400",
		},
		"test": true,
		"type": "product",
		"status": "active",
		"createdBy": "crn::user:b657195e-dc2f-11ea-8566-e7710d592c99",
		"createdAt": "2021-05-12T04:30:11.001Z",
	}]
}
{% endjson %}

### Create Redemption Condition **EXPERIMENTAL**

{% reqspec %}
  POST '/api/collections/{collectionId}/redemption-conditions'
  auth 'api-key'
  path_param 'collectionId', 'NFhUgPQEYbk2EbTXAYArTX'
  body ({
   "merchantId": "36EALpZ89XpShxM2Ee9sXT",
		"allowedProducts": [
			{ "sku": "100001", "name": "White Bread", "maxValue": { "currency": "NZD", "amount": "400" },}, 
			{ "sku": "100002", "name": "Sourdough Bread", "maxValue": { "currency": "NZD", "amount": "800" },}, 
		]
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "1234",
  "merchantId": "36EALpZ89XpShxM2Ee9sXT",
  "collectionId": "NFhUgPQEYbk2EbTXAYArTX",
  "allowedProducts": [
	  { sku: "100001", name: "White Bread", maxValue: { currency: "NZD", amount: "400" },}, 
	  { sku: "100002", name: "Sourdough Bread", maxValue: { currency: "NZD", amount: "800" },}, 
  ],
  "createdAt": "2022-05-12T04:30:11.001Z",
  "createdBy": "crn::user:b657195e-dc2f-11ea-8566-e7710d592c99",
}
{% endjson %}

### Create Token **EXPERIMENTAL**

{% reqspec %}
  POST '/api/tokens'
  auth 'api-key'
  body ({
    "collectionId": "Jaim1Cu1Q55uooxSens6yk",
    "idempotencyKey": "payment-de32dd90-b46c-11ea-93c3-83a333b86e7b"
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "pe32dd90-b46c-11ea-92828sa",
  "accountId": "WRhAxxWpTKb5U7pXyxQjjP",
	"category": "token",
	"collectionId": "Jaim1Cu1Q55uooxSens6yk",
  "status": "active",
  "createdAt": "2021-01-17T18:00:23.000Z",
  "activeFrom": "2021-01-17T18:00:23.000Z",
  "expiresAt": "2022-01-18T18:00:23.000Z",
	"liveness": "test",
	"createdBy": "crn:1234abc:api-key:MyAssetIssuerKey",
	"description": "My Cafe Token",
  "issuerImg": "https://static.centrapay.com/assets/brands/centraperk/logo.png",
	"img": "https://static.centrapay.com/assets/brands/centraperk/cafe-token.png",
  "issuer": "Centraperk Cafe",
  "issuerWebsite": "www.centraperk-cafe.com",
	"type": "centrapay.token.test"
}
{% endjson %}

{% h4 Error Responses %}

| Status |         Code          |                               Description                                |
| :----- | :-------------------- | :----------------------------------------------------------------------- |
| 403    | TOKEN_ALREADY_CREATED | Token with supplied parameters already exists.                           |
| 403    | LIVENESS_MISMATCH     | The account is test and the collection's liveness is main or vice versa. |
