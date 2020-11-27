---
layout: default
title: Assets
has_children: true
---

# Assets
{:.no_toc}

Assets are resources that can be used to satisfy payment requests. Assets are
owned by an account and can be sent to other users.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Get Asset

{% endpoint GET https://service.centrapay.com/api/assets/${id} %}

Get asset by asset id. Returned response can be any supported asset type (wallet or gift card).

```sh
curl -X GET "https://service.centrapay.com/api/assets/L75M3L56N2PtBSt8g7uXLU" \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "type": "giftcard",
  "issuer": "ezipay",
  "externalId": "23403283262",
  "description": "$60 Acme Giftcard",
  "initialValue": "6000",
  "currentValue": "6000",
  "currentValueUpdatedAt": "2021-01-01T00:00:00.000Z",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```
## List Assets for Account

{% endpoint GET https://service.centrapay.com/api/accounts/${id}/assets %}

List asset by account id. Returned response can be an array of any supported asset types (wallet or gift card).

```sh
curl -X GET "https://service.centrapay.com/api/accounts/Te2uDM7xhDLWGVJU3nzwnh/assets" \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
{
  "items": [{
    "id": "L75M3L56N2PtBSt8g7uXLU",
    "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
    "type": "giftcard",
    "issuer": "ezipay",
    "externalId": "23403283262",
    "description": "$60 Acme Giftcard",
    "initialValue": "6000",
    "currentValue": "6000",
    "currentValueUpdatedAt": "2021-01-01T00:00:00.000Z",
    "expiresAt": "2020-12-31T00:00:00.000Z",
    "createdAt": "2020-05-01T12:30:00.000Z"
  }]
}
```
