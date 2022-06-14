---
layout: default
parent: API Reference
title: Scanned Codes
permalink: /api/scanned-codes
---

# Scanned Codes

A scanned code is a barcode that a merchant scans. The code can be used to create a [Payment Request][].

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Scanned Code

{% h4 Mandatory Fields %}

|      Field       |  Type  |                                              Description                                               |
| :--------------- | :----- | :----------------------------------------------------------------------------------------------------- |
| code             | String | The utf8 representation of data decoded from what was scanned.                                         |
| scannedBy        | String | The person that scanned the code. Can be `merchant`.                                                   |
| provider         | String | The integrator that owns the code. The provider can be used to determine what [Line Items][] to apply. |
| displayName      | String | A formatted name that can be displayed in a client.                                                    |
| merchantConfigId | String | The ID of the [Merchant Config][].                                                                     |

## Operations

<a name="decode-scanned-code"></a>
### Decode Scanned Code

{% reqspec %}
  POST '/api/decode'
  auth 'jwt'
  example {
    title 'Decode Merchant Scanned Barcode'
    body ({
      code: '123456789',
      scannedBy: 'merchant',
      merchantConfigId: 'P9gm1s1Cu1Q5uooxs'
    })
  }
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "code": "123456789",
  "scannedBy": "merchant",
  "merchantConfigId": "P9gm1s1Cu1Q5uooxs",
  "provider": "farmlands",
  "displayName": "Farmlands Card"
}
{% endjson %}

{% h4 Error Responses %}

| Status |           Code            |                                      Description                                      |
| :----- | :------------------------ | :------------------------------------------------------------------------------------ |
| 403    | UNKNOWN_CODE              | The code doesn’t exist in our system.                                                 |
| 403    | MERCHANT_CONFIG_NOT_FOUND | The supplied merchant config does not exist.                                          |
| 403    | INVALID_MERCHANT_CONFIG   | The merchant config does not have a payment option that can satisfy the scanned code. |

[Merchant Config]: {% link api/merchants/merchant-configs.md %}
[Payment Request]: {% link api/payment-requests/payment-requests.md %}
[Line Items]: {% link api/payment-requests/payment-requests.md %}#line-item
