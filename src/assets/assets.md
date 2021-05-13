---
layout: default
title: Assets 
parent: Assets
nav_order: 1
permalink: /api/assets
redirect_from:
  - /assets/
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


## Archive Asset (EXPERIMENTAL)

{% endpoint POST https://service.centrapay.com/api/assets/${id}/archive %}

Archive supported asset types by asset id, currently only gift cards may be archived.

```sh
curl -X POST "https://service.centrapay.com/api/assets/L75M3L56N2PtBSt8g7uXLU/archive" \
  -H "x-api-key: 1234"
```

**Example response payload**

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

**Error Responses**

| Status | Code                    | Description                                         |
|:-------|:------------------------|:----------------------------------------------------|
| 403    | UNSUPPORTED_ASSET_TYPE  | Asset type can not be archived                      |
