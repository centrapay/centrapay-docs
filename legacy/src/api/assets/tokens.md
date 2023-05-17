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

## Create Token

{% reqspec %}
  POST '/api/tokens'
  auth 'api-key'
  body ({
    "collectionId": "Jaim1Cu1Q55uooxSens6yk",
    "idempotencyKey": "payment-de32dd90-b46c-11ea-93c3-83a333b86e7b",
		"liveness": "test"
  })
{% endreqspec %}

{% h4 Fields %}

|     Field      |  Type   |                                      Description                                       |
| :------------- | :------ | :------------------------------------------------------------------------------------- |
| collectionId   | String  | The token collection that will govern the branding and redemption rules for the token. |
| idempotencyKey | String  | Client-supplied identifier that prevents double creation.                              |
| liveness       | Boolean | 'main' if the token is a live token, 'test' if the token is a test token.              |

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

| Status |              Code               |                             Description                              |
| :----- | :------------------------------ | :------------------------------------------------------------------- |
| 403    | TOKEN_ALREADY_CREATED           | Token with supplied parameters already exists.                       |
| 403    | ACCOUNT_LIVENESS_MISMATCH       | The account is test and the supplied liveness is main or vice versa. |
