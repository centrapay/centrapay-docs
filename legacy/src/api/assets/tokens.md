---
layout: default
grand_parent: API Reference
parent: Assets
title: Tokens
permalink: /api/tokens
---

# Tokens
{:.no_toc}

Tokens are assets which can only be spent in full.

Every token is associated with a collection, which defines the branding and general rules for the tokens, such as active duration.

A redemption condition is created for each merchant that accepts tokens from a collection, and contains additional conditions specific to that merchant, such as redeemable product identifiers.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

<a name="token-collection">
### Token Collection **EXPERIMENTAL**

{% h4 Fields %}

|       Field       |                   Type                    |                                     Description                                     |
| :---------------- | :---------------------------------------- | :---------------------------------------------------------------------------------- |
| name              | String                                    | The display name of the collection.                                                 |
| accountId         | String                                    | The account that will own the collection.                                           |
| tokenExpiresAfter | [Token Expires After](#tokenExpiresAfter) | The active duration of all tokens created from this collection.                     |
| type              | String                                    | The type of value exchanged when redeeming tokens, can be `product`                 |
| maxValue          | {% dt Monetary %} {% opt %}               | The maximum agreed value that any merchants will be settled for a token redemption. |
| id                | String                                    | The token collection id                                                             |
| test              | Boolean                                   | `true` if the token collection is for testing purposes only.                        |
| status            | String                                    | The status of the token collection. Valid values include 'active'.                  |
| createdBy         | {% dt CRN %}                              | The identity that created the activity.                                             |
| createdAt         | {% dt Timestamp %}                        | Timestamp at which the token collection was created.                                |
| mediaUploadId     | String {% opt %}                          | The id of the [media upload] [] image of the collection.                            |
| img               | String {% opt %}                          | The img URL of the collection.                                                      |

<a name="tokenExpiresAfter">
### Token Expires After **EXPERIMENTAL**

|  Field   |  Type  |                          Description                           |
| :------- | :----- | :------------------------------------------------------------- |
| period   | String | Supported values are `hour`, `day`, `week`,`month` and `year`. |
| duration | String | Number of `period` until token expiration.                     |

### Redemption Condition **EXPERIMENTAL**
{% h4 Fields %}

|      Field      |                      Type                      |                                                 Description                                                 |
| :-------------- | :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| merchantId      | String                                         | The identifier of the merchant that is accepting the collection.                                            |
| allowedProducts | [Allowed Products](#allowedProducts) {% opt %} | List of allowed products, required for collections of type `product`                                        |
| id              | String                                         | The redemption condition id                                                                                 |
| collectionId    | String                                         | The [token collection](#token-collection) that will govern the branding and redemption rules for the token. |
| createdBy       | {% dt CRN %}                                   | The identity that created the activity.                                                                     |
| createdAt       | {% dt Timestamp %}                             | Timestamp at which the redemption condition was created.                                                    |

<a name="allowedProducts">
### Allowed Products **EXPERIMENTAL**

|  Field   |       Type        |                       Description                       |
| :------- | :---------------- | :------------------------------------------------------ |
| sku      | String            | The SKU of the product that is to be accepted.          |
| name     | String            | Display name of the product                             |
| maxValue | {% dt Monetary %} | The maximum value that the product can be redeemed for. |

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
		"mediaUploadId": "12345",
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
	"mediaUploadId": "12345",
	"img": "https://static.centrapay.com/assets/collections/{mediaUploadId}.png"
}
{% endjson %}  

### List Token Collections for Account **EXPERIMENTAL**

Returns a [paginated][] list of token collections for an account.

{% reqspec %}
  GET '/api/accounts/{accountId}/collections'
  auth 'api-key'
  path_param 'accountId', 'T3y6hogYA4d612BExypWYH'
	query_param 'pageKey', 'Collection#2G5bXm4dnuDHnnKY8WeCPm|#Collection|8vq4kn03o0g1grrihk7ooloizpqt2y'
{% endreqspec %}

{% h4 Fields %}

|  Field  |       Type       |               Description                |
| ------- | ---------------- | ---------------------------------------- |
| pageKey | String {% opt %} | Used to retrieve the next page of items. |

Note: The `pageKey` value, if provided, needs to be URL-encoded.

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
		"mediaUploadId": "12345",
		"img": "https://static.centrapay.com/assets/collections/{mediaUploadId}.png"
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

{% h4 Error Responses %}

| Status |                Code                 |                                                  Description                                                   |
| :----- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| 403    | INVALID_AMOUNT                      | One or more of the maxValue amount in the products has exceeded the maxValue amount defined on the collection. |
| 403    | REDEMPTION_CONDITION_ALREADY_EXISTS | A redemption condition for the collection and the merchant has already been created.                           |

### Create Token **EXPERIMENTAL**

{% reqspec %}
  POST '/api/tokens'
  auth 'api-key'
	example {
    title 'Create a token'
		body ({
    "collectionId": "Jaim1Cu1Q55uooxSens6yk",
    "idempotencyKey": "payment-de32dd90-b46c-11ea-93c3-83a333b86e7b",
  	})
  }
  example {
    title 'Create a token with externalId'
    body ({
    "collectionId": "Jaim1Cu1Q55uooxSens6yk",
    "idempotencyKey": "payment-de32dd90-b46c-11ea-93c3-83a333b86e7b",
		"externalId": "23403283262",
  	})
  }
{% endreqspec %}

{% h4 Fields %}

|     Field      |       Type       |                                                 Description                                                 |
| :------------- | :--------------- | :---------------------------------------------------------------------------------------------------------- |
| collectionId   | String           | The [token collection](#token-collection) that will govern the branding and redemption rules for the token. |
| idempotencyKey | String           | Client-supplied identifier that prevents double creation.                                                   |
| externalId     | String {% opt %} | The asset identifier from the issuing system.                                                               |

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
	"type": "centrapay.token.test",
	"externalId": "23403283262",
}
{% endjson %}

{% h4 Error Responses %}

| Status |         Code          |                               Description                                |
| :----- | :-------------------- | :----------------------------------------------------------------------- |
| 403    | TOKEN_ALREADY_CREATED | Token with supplied parameters already exists.                           |
| 403    | LIVENESS_MISMATCH     | The account is test and the collection's liveness is main or vice versa. |

[paginated]: {% link api/pagination.md %}
[media upload]: {% link api/media-uploads.md %}