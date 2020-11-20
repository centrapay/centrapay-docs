---
layout: default
parent: Assets
title: Discrete Assets
---

# Discrete Assets
{:.no_toc}

Discrete assets are assets which may be spent in whole or in part but can only
be sent in whole.  Discrete assets may be issued by Centrapay or by a supported
third-party/external issuer.  Discrete assets can be spent by the owner to
satisfy payment requests which support the asset type.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Load an External Asset (EXPERIMENTAL)

{% endpoint POST https://service.centrapay.com/api/external-assets %}

Load an asset from a supported third-party issuer. Asset details will be obtained from the issuer.

```sh
curl -X POST "https://service.centrapay.com/api/external-assets" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
    "type": "giftcard",
    "issuer": "ezipay",
    "externalId": "6060234032832627"
    "pin": "1234"
  }'
```

**Required Fields**

| Parameter  | Type   | Description                                                                          |
|:-----------|:-------|:-------------------------------------------------------------------------------------|
| accountId  | String | The Centrapay account which will own the asset.                                      |
| type       | String | The asset type. Valid values: "giftcard".                                            |
| issuer     | String | The asset issuer. Valid values: "ezipay".                                            |
| externalId | String | The issuer's asset id such as card number.                                           |

**Optional Parameters**

| Parameter      | Type   | Description                                                                  |
|:---------------|:-------|:-----------------------------------------------------------------------------|
| pin            | String | Additional secret required by the issuer for loading or redeeming the asset. |
| description    | String | Description of the asset, eg: "$60 Acme Giftcard".                           |

**Example response payload**

```json
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "type": "giftcard",
  "issuer": "ezipay",
  "externalId": "***********60119",
  "pin": "****",
  "description": "$60 Acme Giftcard",
  "value": "6000",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```

**Error Responses**

| Status | Code                    | Description                                         |
|:-------|:------------------------|:----------------------------------------------------|
| 403    | {% break _ FORBIDDEN %} | Invalid external id or pin or asset already exists. |
