---
layout: default
grand_parent: API Reference
parent: Assets
title: External Assets
permalink: /api/external-assets
redirect_from:
  - /assets/discrete-assets
  - /api/discrete-assets
---

# External Assets
{:.no_toc}

External assets are [Assets][] which are issued by a third-party.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Load an External Asset

Load an asset from a supported third-party issuer. Asset details will be obtained from the issuer.

{% reqspec %}
  POST '/api/external-assets'
  auth 'api-key'
  body ({
    accountId: "Jaim1Cu1Q55uooxSens6yk",
    category: "giftcard",
    type: "epay.nzd.test",
    issuer: "ezipay",
    externalId: "23403321042",
    pin: "3771"
  })
{% endreqspec %}


{% h4 Required Fields %}

| Parameter  | Type   | Description                                                                                      |
|:-----------|:-------|:-------------------------------------------------------------------------------------------------|
| accountId  | String | The Centrapay account which will own the asset.                                                  |
| category   | String | The category an asset will be grouped by. Valid values: "giftcard".                              |
| type       | String | The Centrapay ledger corresponding to the asset. Valid values: "epay.nzd.main", "epay.nzd.test". |
| issuer     | String | The asset issuer. Valid values: "ezipay".                                                        |
| externalId | String | The issuer's asset id such as card number.                                                       |

{% h4 Optional Parameters %}

| Parameter      | Type   | Description                                                                  |
|:---------------|:-------|:-----------------------------------------------------------------------------|
| pin            | String | Additional secret required by the issuer for loading or redeeming the asset. |
| description    | String | Description of the asset, eg: "$60 Acme Giftcard".                           |

{% h4 Example response payload %}

```json
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "category": "giftcard",
  "type": "epay.nzd.main",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "issuer": "ezipay",
  "externalId": "***********60119",
  "description": "$60 Acme Giftcard",
  "productCode": "23403",
  "currency": "NZD",
  "initialBalance": "7000",
  "balance": "6000",
  "balanceUpdatedAt": "2020-06-10T15:30:00.000Z",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```

{% h4 Error Responses %}

| Status | Code                                   | Description                                                 |
|:-------|:-------------------------------------- |:------------------------------------------------------------|
| 403    | {% break _ UNKNOWN_ASSET %}             | Asset ID or PIN is incorrect.                               |
| 403    | {% break _ DUPLICATE_ASSET %}           | Asset already claimed by another account.                   |
| 403    | {% break _ UNSUPPORTED_ASSET_TYPE %}    | Unsupported asset type, origin, or issuer.                  |
| 403    | {% break _ DENIED_BY_ASSET_PROVIDER %}  | Asset exists, but is not enabled for use through centrapay. |
| 403    | {% break _ EXPIRED_BY_ASSET_PROVIDER %} | Asset exists, but it's expired.                             |

[Assets]: {% link api/assets/assets.md %}
