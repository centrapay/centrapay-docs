---
layout:  default
grand_parent: API Reference
parent: Payment Requests
title: Payment Activities
nav_order: 2
permalink: /api/payment-activities
---

# Payment Activities
{:.no_toc}

A Payment Activity records a transaction that has happened on a [Payment Request][].

Payment Activities are created when a Payment Request has been **created**, **paid**, or **refunded**.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Payment Activity **EXPERIMENTAL**

{% h4 Mandatory Fields %}

|       Field       |        Type        |                                       Description                                        |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| type              | String             | The type of Payment Activity. Can be created, paid or refunded.                          |
| paymentRequestId  | String             | The payment request id.                                                                  |
| value             | {% dt Monetary %}  | The value of the payment activity. Must be positive.                                     |
| shortCode         | String             | The short code for the payment activity.                                                 |
| merchantConfigId  | String             | The [Merchant Config][] id used to configure the payment options.                        |
| merchantId        | String             | The id of the [Merchant][] the Payment Request is on behalf of.                          |
| merchantAccountId | String             | The id of the Centrapay [Account][] of the Merchant the Payment Request is on behalf of. |
| merchantName      | String             | The name of the Merchant the Payment Request is on behalf of.                            |
| createdAt         | {% dt Timestamp %} | When the payment activity was created.                                                   |
| updatedAt         | {% dt Timestamp %} | When the payment activity was updated.                                                   |

{% h4 Optional Fields %}

| Field           | Type   | Description                                                         |
|-----------------|--------|---------------------------------------------------------------------|
| createdByUserId | String | The id of the user that created the Payment Request.                |
| assetType       | String | An [Asset Type][] that was used to transact on the Payment Request. |


## Operations

### List Payment Activities **EXPERIMENTAL**
{% reqspec %}
  GET '/api/payment-activities'
  auth 'jwt'
  query_param 'merchantId', '5ee0c486308f590260d9a07f'
  query_param 'shortCode', '123abc'
{% endreqspec %}

{% h4 Required Fields %}

|   Field    |  Type  |                           Description                           |
| ---------- | ------ | --------------------------------------------------------------- |
| merchantId | String | The id of the [Merchant][] the Payment Request is on behalf of. |


{% h4 Example response payload %}
```json
[
  {
    "type": "request",
    "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
    "value": { "currency": "NZD", "amount": "6190" },
    "shortCode": "123abc",
    "merchantName": "Centrapay Café",
    "merchantId": "5ee0c486308f590260d9a07f",
    "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
    "merchantConfigId": "5ee168e8597be5002af7b454",
    "createdAt": "2021-06-12T01:17:46.499Z",
    "updatedAt": "2021-06-12T01:17:46.499Z",
    "createdByUserId": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
  },
  {
    "type": "payment",
    "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
    "value": { "currency": "NZD", "amount": "6190" },
    "shortCode": "123abc",
    "merchantName": "Centrapay Café",
    "merchantId": "5ee0c486308f590260d9a07f",
    "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
    "merchantConfigId": "5ee168e8597be5002af7b454",
    "createdAt": "2021-06-12T01:17:46.499Z",
    "updatedAt": "2021-06-12T01:17:46.499Z",
    "createdByUserId": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
    "assetType": "centrapay.nzd.main",
  },
  {
    "type": "refund",
    "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
    "value": { "currency": "NZD", "amount": "6190" },
    "shortCode": "123abc",
    "merchantName": "Centrapay Café",
    "merchantId": "5ee0c486308f590260d9a07f",
    "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
    "merchantConfigId": "5ee168e8597be5002af7b454",
    "createdAt": "2021-06-12T01:17:46.499Z",
    "updatedAt": "2021-06-12T01:17:46.499Z",
    "createdByUserId": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
    "assetType": "centrapay.nzd.main",
  }
]
```

[Payment Request]: {% link api/payment-requests/payment-requests.md %}
[Merchant Config]: {% link api/merchants/merchant-configs.md %}
[Merchant]: {% link api/merchants/merchants.md %}
[Asset Type]: {% link api/assets/asset-types.md %}
[Account]: {% link api/accounts/accounts.md %}
