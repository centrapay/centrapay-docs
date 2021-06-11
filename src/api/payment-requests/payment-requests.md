---
layout:  default
grand_parent: API Reference
parent: Payment Requests
title: Payment Requests
nav_order: 1
permalink: /api/payment-requests
---

# Payment Requests
{:.no_toc}


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Payment Request

{% h4 Mandatory Fields %}

| Field                   | Type               | Description                                                                 |
|-------------------------|--------------------|-----------------------------------------------------------------------------|
| id                      | String             | The payment request id.                                                     |
| value                   | Object             | The canonical value of the payment request.                                 |
| {% tab %}value.amount   | {% dt BigNumber %} | The canonical value amount.                                                 |
| {% tab %}value.currency | String             | The canonical value currency.                                               |
| paymentOptions          | Array              | The [Payment Options](#payment-option), indicating valid asset for payment. |
| status                  | String             | "new", "paid", "cancelled", "expired"                                       |
| liveness                | String             | Indicates test assets are accepted. Values are "main" or "test".            |
| createdAt               | {% dt Timestamp %} | When the payment request was created.                                       |
| updatedAt               | {% dt Timestamp %} | When the payment request was updated.                                       |
| expiresAt               | {% dt Timestamp %} | When the payment request expires.                                           |


{% h4 Optional Fields %}

| Field            | Type   | Description                                                          |
|------------------|--------|----------------------------------------------------------------------|
| patronCodeId     | String | The id of the [Patron Code][] the payment request is attached to.        |
| merchantId       | String | The id of the merchant the payment request is on behalf of.          |
| merchantName     | String | The name of the merchant the payment request is on behalf of.        |
| merchantConfigId | String | The merchant configuration id used to configure the payment options. |
| expirySeconds    | Number | The expiry seconds used to configure the payment request expiry.     |
| lineItems        | Array  | **EXPERIMENTAL** The [Line Items](#line-item) being paid for.       |


### Payment Option

{% h4 Mandatory Fields %}

| Field     | Type               | Description                                                             |
|-----------|--------------------|-------------------------------------------------------------------------|
| assetType | String             | An [Asset][] type reference.                                            |
| amount    | {% dt BigNumber %} | The value required to pay using the canonical units for the asset type. |


### Line Item

{% h4 Mandatory Fields %}

| Field       | Type               | Description                                                                              |
|-------------|--------------------|------------------------------------------------------------------------------------------|
| value       | {% dt BigNumber %} | The value required to pay using the canonical currency and units of the payment request. |
| description | String             | The line item description.                                                               |
| code        | String             | The product code.                                                                        |


## Operations

<a name="patron-code"></a>
### Get a Payment Request using Patron Code id **EXPERIMENTAL**

This is only available to the account which created the Patron Code for finding the Payment Request
attached to it. If you didn't create the Patron Code or it doesn't exist, this will return a 403
response.

{% endpoint GET https://service.centrapay.com/api/patron-codes/{patronCodeId}/payment-request %}

```sh
curl -X GET "https://service.centrapay.com/api/patron-codes/DiBAKsHCeLNG9ai4LeLrhr/payment-request" \
  -H "x-api-key: 1234"
```

**Example response payload when no Payment Request attached**

```json
{}
```

**Example response payload when a Payment Request is attached**

```json
{
  "id": "207b5fb5-621e-4282-86c3-42ee47f87e74",
  "patronCodeId": "V17FByEP9gm1shSG6a1Zzx",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantName": "NZD Test Merchant",
  "merchantConfigurationId": "5efbe2fb96c08357bb2b9242",
  "value": { "currency": "NZD", "amount": "100" },
  "paymentOptions": [
    {
      "amount": "100",
      "assetType": "centrapay.nzd.test"
    }
  ],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:04:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
```



[Patron Code]: {% link api/patron-codes.md %}
[Asset]: {% link api/assets/assets.md %}
[PaymentOption]: #payment-option
[LineItem]: #line-item
