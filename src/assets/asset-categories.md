---
layout: default
parent: Assets
title: Asset Categories
---

# Asset Categories
{:.no_toc}

Centrapay digital assets are categorized as either Money, Gift Cards or Tokens.
Depending on the asset category it will have different attributes available and
different rules governing how they can be obtained, shared or spent.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}



## Asset Model

All assets have the following fields along with the additional fields that are
specific to its category.

**Required Fields**

| Field       | Type        | Description                                        |
|:------------|:------------|:---------------------------------------------------|
| id          | String      | The asset's unique identifier.                     |
| accountId   | String      | The asset's owning Centrapay account id.           |
| category    | String      | Asset category ("giftcard", "wallet", or "token"). |
| type        | String      | Asset type id used by payment option asset types.  |
| description | String      | Displayable asset description.                     |
| createdAt   | Date String | Date when the asset was created or issued.         |


## Money

Money assets, being backed by real currency, are the most flexible asset types.
Money assets can be exchanged relatively freely within the same asset type.

**Required Fields**

Beyond the base fields, money assets also have the following:

| Field    | Type           | Description                                                                    |
|:---------|:---------------|:-------------------------------------------------------------------------------|
| currency | String         | Currency code, eg "NZD"                                                        |
| balance  | Numeric String | Current balance in the smallest denomination for the currency (usually cents). |

## Gift Cards

Gift cards are similar to money but have greater spending restrictions and are
not always backed by real currency. Gift cards usually have an expiry date, are
typically tied to a small number of merchants, and can only be sent in their
entirety.

Beyond the base fields, gift card assets also have the following fields.

**Required Fields**

| Field          | Type           | Description                                     |
|:---------------|:---------------|:------------------------------------------------|
| issuer         | String         | The identifier for the issuer of the gift card. |
| initialBalance | Numeric String | The balance when the asset was created.         |
| balance        | Numeric String | The current asset balance.                      |

**Optional Fields**

| Field            | Type        | Description                                                |
|:-----------------|:------------|:-----------------------------------------------------------|
| externalId       | String      | The asset identifier from the issuing system.              |
| expiresAt        | Date String | The date when the asset expires.                           |
| balanceUpdatedAt | Date String | The date when the balance was last observed to be updated. |


## Tokens (EXPERIMENTAL)

Tokens may have value represented in multiple currencies. Token assets have
all the base fields as well as the following fields.

**Required Fields**

| Field | Type                  | Description                           |
|:------|:----------------------|:--------------------------------------|
| value | Array&lt;Token Value> | Token values in supported currencies. |

**Token Value Object**

| Field    | Type           | Description                                                          |
|:---------|:---------------|:---------------------------------------------------------------------|
| currency | String         | Currency code, eg "NZD".                                             |
| amount   | Numeric String | Value in the smallest denomination for the currency (usually cents). |
