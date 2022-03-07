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

Payment Activities are created when a Payment Request has been **created**, **paid**, **refunded**, **cancelled**, or **expired**.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Payment Activity **EXPERIMENTAL**

{% h4 Mandatory Fields %}

|          Field          |        Type        |                     Description                      |
| ----------------------- | ------------------ | ---------------------------------------------------- |
| type                    | String             | See Activity Types below.                            |
| value                   | {% dt Monetary %}  | The value of the payment activity. Must be positive. |
| paymentRequestId        | String             | The Payment Request's id.                            |
| merchantId              | String             | The Payment Request's [Merchant][] id.               |
| merchantConfigId        | String             | The Payment Request's [Merchant Config][] id.        |
| merchantAccountId       | String             | The Payment Request's Merchant [Account][] id.       |
| merchantName            | String             | The Payment Request's Merchant name.                 |
| createdAt               | {% dt Timestamp %} | When the activity was created.                       |
| createdBy               | {% dt CRN %}       | The identity that created the activity.              |
| paymentRequestCreatedBy | {% dt CRN %}       | The identity that created the Payment Request.       |
| activityNumber          | {% dt BigNumber %} | Unique sequential number for the activity.           |

{% h4 Optional Fields %}

|   Field   |  Type   |                                         Description                                         |
| --------- | ------- | ------------------------------------------------------------------------------------------- |
| assetType | String  | The [Asset Type][] for the "payment" or "refund" activity.                                  |
| external  | Boolean | The payment activity is recording a transaction that occurred outside the Centrapay system. |

{% h4 Activity Types %}

|     Name     |                    Description                     |
| ------------ | -------------------------------------------------- |
| request      | [Payment Request][] was created.                   |
| payment      | [Payment Request][] was paid.                      |
| refund       | Funds were returned to the shopper.                |
| cancellation | [Payment Request][] was cancelled by the merchant. |
| expiry       | [Payment Request][] wasn't paid before time out.   |


## Operations

<a name="pay-request">
### Pay a Payment Request **EXPERIMENTAL**

There are two methods of paying a payment request.
The first uses Centrapay [Assets] and requires you to provide the Id and the type of the asset.
Alternatively you can provide an external transaction Id and the Centrapay [Asset Type][] for any payments that we support. An example of an external transaction would be a Bitcoin payment.

{% reqspec %}
  POST '/api/payment-requests/{paymentRequestId}/pay'
  auth 'jwt'
  example {
    title 'Pay a Payment Request with a Centrapay asset'
    body ({
      "assetType": "centrapay.nzd.main",
      "assetId": "WRhAxxWpTKb5U7pXyxQjjY"
    })
  }

  example {
    title 'Pay a Payment Request using external transaction'
    body ({
      "assetType": "bitcoin.main",
      "transactionId": "VMXMkUttDGTVz4ESv5ND56",
    })
  }

{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "type": "payment",
  "value": { "currency": "NZD", "amount": "1000" },
  "assetType": "centrapay.nzd.main",
  "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
  "merchantName": "Centrapay Café",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
  "merchantConfigId": "5efbe2fb96c08357bb2b9242",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "activityNumber": "2",
},
{% endjson %}


{% h4 Error Responses %}

| Status |                  Code                  |                                                                                        Description                                                                                         |
| :----- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ INVALID_ASSET_TYPE %}       | Either the merchant is not configured with the provided asset type or the asset type does not exist.                                                                                       |
| 403    | {% break _ REQUEST_EXPIRED %}          | Action cannot be completed because the request has expired.                                                                                                                                |
| 403    | {% break _ REQUEST_PAID %}             | Action cannot be completed because the request has been paid.                                                                                                                              |
| 403    | {% break _ REQUEST_CANCELLED %}        | Action cannot be completed because the request has already been cancelled.                                                                                                                 |
| 403    | {% break _ INACTIVE_ASSET %}           | The asset is not spendable. It may have been disabled, expired, or already spent.                                                                                                          |
| 403    | {% break _ INVALID_MERCHANT_CONFIG %}  | The merchant is not configured properly to satisfy the payment request. This could be due to incorrect information, or the merchant’s credentials might be blocked by an external service. |
| 403    | {% break _ QUOTA_EXCEEDED %}           | The payment pay request exceeds the allowed spend quota supplied.                                                                                                                          |
| 403    | {% break _ INSUFFICIENT_ASSET_VALUE %} | The asset has insufficient funds to pay the payment request or the transaction amount received by Centrapay is less than the total of the payment.                                         |
| 403    | {% break _ ASSET_REDEMPTION_DENIED %}  | The asset redemption has been unsuccessful due to an error with provided payment parameters, the merchant, or the asset.                                                                   |

<a name="refund-request">
### Refund a Payment Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/payment-requests/{paymentRequestId}/refund'
  auth 'jwt'
  example {
    title 'Refund a Payment Request'
    body ({
      "value": {
        "amount": "100",
        "currency": "NZD",
      },
      "externalRef": "e8df06e2-13a5-48b4-b670-3fd6d815fe0a",
    })
  }

{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "type": "refund",
  "value": { "currency": "NZD", "amount": "100" },
  "assetType": "centrapay.nzd.main",
  "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
  "merchantName": "Centrapay Café",
  "merchantId": "5ee0c486308f590260d9a07f",
  "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
  "merchantConfigId": "5ee168e8597be5002af7b454",
  "createdAt": "2021-06-12T01:17:00.000Z",
  "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "activityNumber": "3",
},
{% endjson %}

{% h4 Error Responses %}

| Status |                    Code                     |                                                                                                                                 Description                                                                                                                                 |
| :----- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ NOT_PAID %}                      | The payment request has not been paid.                                                                                                                                                                                                                                      |
| 403    | {% break _ ALREADY_REFUNDED %}              | The payment request has already been refunded.                                                                                                                                                                                                                              |
| 403    | {% break _ INVALID_AMOUNT %}                | The refund requested is greater than the refundable amount.                                                                                                                                                                                                                 |
| 403    | {% break _ REPEAT_REFERENCE %}              | A separate refund request for the payment request has the same external reference. Attempting to refund the payment request twice with the same external reference is not allowed. If the amount of the refund is the same we assume it is a repeat request and return 200. |
| 403    | {% break _ PARTIAL_REFUNDS_NOT_ALLOWED %}   | The asset does not support partial refunds.                                                                                                                                                                                                                                 |
| 403    | {% break _ INACTIVE_ASSET %}                | The asset is not refundable. It may have been disabled, expired, or already refunded.                                                                                                                                                                                       |
| 403    | {% break _ REFUND_NOT_SUPPORTED %}          | The asset type does not support refunds.                                                                                                                                                                                                                                    |
| 403    | {% break _ REFUND_WINDOW_EXCEEDED %}        | The time since the payment exceeds the window of time a payment request can be refunded in.                                                                                                                                                                                 |

### List Payment Activities For Merchant **EXPERIMENTAL**

List payment activities for a merchant. Results are [paginated][] and ordered by
descending activity created date.

{% reqspec %}
  GET '/api/payment-activities'
  auth 'jwt'
  query_param 'merchantId', '5ee0c486308f590260d9a07f'
  query_param 'pageKey', 'PaymentRequest#E9eXsErwA444qFDoZt5iLA|Activity#000000000000001|614161c4c4d3020073bd4ce8|2021-09-15T03:00:21.156Z'
{% endreqspec %}

{% h4 Required Fields %}

|   Field    |  Type  |                           Description                           |
| ---------- | ------ | --------------------------------------------------------------- |
| merchantId | String | The id of the [Merchant][] the Payment Request is on behalf of. |

{% h4 Optional Fields %}

|   Field   |  Type  |               Description                |
| --------- | ------ | ---------------------------------------- |
| pageKey   | String | Used to retrieve the next page of items. |


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
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:17:00.000Z",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "3",
    },
    {
      "type": "payment",
      "value": { "currency": "NZD", "amount": "6190" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:16:00.000Z",
      "createdBy": "crn::user:da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "2",
    },
    {
      "type": "request",
      "value": { "currency": "NZD", "amount": "6190" },
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:15:46.000Z",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "1",
    }
  ]
}
{% endjson %}

### List Payment Activities For Payment Request **EXPERIMENTAL**

List payment activities for a payment request. Results are ordered by
descending activity created date.

{% reqspec %}
  GET '/api/payment-requests/{paymentRequestId}/activities'
  auth 'jwt'
  path_param 'paymentRequestId', 'MhocUmpxxmgdHjr7DgKoKw'
{% endreqspec %}

{% h4 Example response payload %}
{% json %}
{
  "items": [
    {
      "type": "refund",
      "value": { "currency": "NZD", "amount": "600" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:17:00.000Z",
      "createdBy": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "3",
    },
    {
      "type": "payment",
      "value": { "currency": "NZD", "amount": "6190" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:16:00.000Z",
      "createdBy": "crn::user:da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "2",
    },
    {
      "type": "request",
      "value": { "currency": "NZD", "amount": "6190" },
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:15:46.000Z",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "1",
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
[Asset Type]: {% link api/assets/asset-types.md %}
[Assets]: {% link api/assets/assets.md %}
