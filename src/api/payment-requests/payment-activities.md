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

| Field                   | Type               | Description                                          |
| -----------------       | ------------------ | ---------------------------------------------------- |
| type                    | String             | See Activity Types below.                            |
| value                   | {% dt Monetary %}  | The value of the payment activity. Must be positive. |
| paymentRequestId        | String             | The Payment Request's id.                            |
| shortCode               | String             | The Payment Request's short code.                    |
| merchantId              | String             | The Payment Request's [Merchant][] id.               |
| merchantConfigId        | String             | The Payment Request's [Merchant Config][] id.        |
| merchantAccountId       | String             | The Payment Request's Merchant [Account][] id.       |
| merchantName            | String             | The Payment Request's Merchant name.                 |
| createdAt               | {% dt Timestamp %} | When the activity was created.                       |
| createdBy               | {% dt CRN %}       | The identity that created the activity.              |
| paymentRequestCreatedBy | {% dt CRN %}       | The identity that created the Payment Request.       |

{% h4 Optional Fields %}

| Field     | Type   | Description                                                |
|-----------|--------|------------------------------------------------------------|
| assetType | String | The [Asset Type][] for the "payment" or "refund" activity. |

{% h4 Activity Types %}

| Name    | Description                   |
|---------|-------------------------------|
| request | Payment Request was created.  |
| payment | Payment Request was paid.     |
| refund  | Payment Request was refunded. |


## Operations

### List Payment Activities **EXPERIMENTAL**

List payment activities for a merchant. Results are [paginated][] and ordered by
descending activity created date.

{% reqspec %}
  GET '/api/payment-activities'
  auth 'jwt'
  query_param 'merchantId', '5ee0c486308f590260d9a07f'
  query_param 'pageKey', 'PaymentRequest#E9eXsErwA444qFDoZt5iLA|Activity#000000000000001|614161c4c4d3020073bd4ce8|2021-09-15T03:00:21.156Z'
  query_param 'shortCode', '123abc'
{% endreqspec %}

{% h4 Required Fields %}

|   Field    |  Type  |                           Description                           |
| ---------- | ------ | --------------------------------------------------------------- |
| merchantId | String | The id of the [Merchant][] the Payment Request is on behalf of. |

{% h4 Optional Fields %}

|   Field   |  Type  |               Description                |
| --------- | ------ | ---------------------------------------- |
| pageKey   | String | Used to retrieve the next page of items. |
| shortCode | String | The [Payment Request][]’s short code.    |


{% h4 Example response payload %}
{% json %}
{
  "nextPageKey": "PaymentRequest#E9eXsErwA444qFDoZt5iLA|Activity#000000000000001|614161c4c4d3020073bd4ce8|2021-09-15T03:00:21.156Z",
  "items": [
    {
      "type": "refund",
      "value": { "currency": "NZD", "amount": "600" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "123abc",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:17:00.000Z",
      "createdBy": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878"
    },
    {
      "type": "payment",
      "value": { "currency": "NZD", "amount": "6190" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "123abc",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:16:00.000Z",
      "createdBy": "crn::user:da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878"
    },
    {
      "type": "request",
      "value": { "currency": "NZD", "amount": "6190" },
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "123abc",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:15:46.000Z",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878"
    }
  ]
}
{% endjson %}

[Payment Request]: {% link api/payment-requests/payment-requests.md %}
[Merchant Config]: {% link api/merchants/merchant-configs.md %}
[Merchant]: {% link api/merchants/merchants.md %}
[Asset Type]: {% link api/assets/asset-types.md %}
[Account]: {% link api/accounts/accounts.md %}
[paginated]: {% link api/pagination.md  %}
