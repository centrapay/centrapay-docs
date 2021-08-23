---
layout: default
grand_parent: API Reference
parent: Merchants
title: Merchants
nav_order: 1
permalink: /api/merchants
redirect_from:
  - /merchants
---

# Merchants
{:.no_toc}

A merchant is an initiator of [Payment Requests][]. A Merchant has [Merchant Configs][]
which define the payment methods available for a Payment Request.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Models

### Merchant

{% h4 Mandatory Fields %}

| Field            | Type   | Description                                   |
| :--------------- | :----- | :------------------------------------------   |
| id               | String | Merchant's unique identifier.                 |
| accountId        | String | Id of Merchant's owning Centrapay account.    |
| name             | String | Merchant name.                                |
| country          | String | Merchant [ISO 3166]{:.external} country code. |

{% h4 Optional Fields %}

| Field            | Type    | Description                                               |
| :--------------- | :-----  | :------------------------------------------               |
| test             | Boolean | **EXPERIMENTAL** Flag indicating merchant is for testing. |
| settlementConfig | Object  | **EXPERIMENTAL** Merchant settlement config               |
| location | {% dt Location %} | **EXPERIMENTAL** Physical Location of Merchant |


## Operations

### Create a Merchant

{% reqspec %}
  POST '/api/merchants'
  auth 'api-key'
  body ({
    accountId: 'C4QnjXvj8At6SMsEN4LRi9',
    name: 'Centrapay Cafe Auckland',
    country: 'NZ',
    test: false,
  })
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Centrapay Cafe Auckland",
  "country": "NZ",
  "test": false
}
```

### Get a Merchant

{% reqspec %}
  GET '/api/merchants/{merchantId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

```json
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Parisian - Brown",
  "test": false,
  "country": "AD"
}
```

### List all Merchants

{% reqspec %}
  GET '/api/merchants'
  auth 'api-key'
{% endreqspec %}


{% h4 Example response payload %}

```json
{
  "items": [
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "BT",
      "id": "5f6bf6ff81552101f8ff6122",
      "name": "Adams, Runolfsdottir and Botsford",
      "test": true
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "GM",
      "id": "5f6bf6ff81552101f8ff6123",
      "name": "Vandervort Inc",
      "test": false
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "MZ",
      "id": "5f6bf6ff81552101f8ff6124",
      "name": "West, O'Reilly and Huels",
      "test": true
    },
  ]
}
```

### List Merchants for Account

{% reqspec %}
  GET '/api/accounts/{accountId}/merchants'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "items": [
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "BT",
      "id": "5f6bf6ff81552101f8ff6122",
      "name": "Adams, Runolfsdottir and Botsford",
      "test": true
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "NZ",
      "id": "5f6bf6ff81552101f8ff6123",
      "name": "Vandervort Inc",
      "test": false
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "MZ",
      "id": "5f6bf6ff81552101f8ff6124",
      "name": "West, O'Reilly and Huels",
      "test": true
    },
  ]
}
```


### Update a Merchant

{% reqspec %}
  PUT '/api/merchants/{merchantId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  body ({
    name: 'Centrapay Café',
    location: {
      lat: '-36.8483579',
      lng: '174.7725834',
      city: 'Auckland',
      postCode: '1010',
      country: 'NZ'
    }
  })
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Centrapay Café",
  "test": false,
  "country": "NZ",
  "location": {
    "lat": "-36.8483579",
    "lng": "174.7725834",
    "city": "Auckland",
    "postCode": "1010",
    "country": "NZ"
  }
}
```

[Merchant Configs]: {% link api/merchants/merchant-configs.md %}
[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[ISO 3166]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[Location]: {% link api/data-types.md %}#Location
