---
layout: default
parent: API Reference
title: Patron Codes
permalink: /api/patron-codes
---

# Patron Codes

A Patron Code is an alternative to presenting a QR code where that option isn't available

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Patron Code Model **EXPERIMENTAL**

{% h4 Required Fields %}

| Field       | Type               | Description                                          |
|:------------|:-------------------|:-----------------------------------------------------|
| id          | String             | The Patron Code's unique identifier.                 |
| barcode     | String             | ✩ Field to display in barcode format.                |
| createdAt   | {% dt Timestamp %} | Date when the Patron Code was created.               |
| createdBy   | String             | Identifier for the account that created the barcode. |
| expiresAt   | {% dt Timestamp %} | Date when the Patron Code will expire.               |
| appName     | String             | The app used to create the Patron Code.              |

✩ Barcode is a 16 digit number. The first 6 digits are a Centrapay defined prefix, then a 9 digit
code, then a luhn checksum digit.

```
9 9 9 0 0 0 1 2 3 4 5 6 7 8 9 5  ❖  complete barcode
9 9 9 0 0 0 - - - - - - - - - -  ❖  centrapay prefix
- - - - - - 1 2 3 4 5 6 7 8 9 -  ❖  code
- - - - - - - - - - - - - - - 5  ❖  luhn checksum
```

The Centrapay Prefix may present any of the following prefixes:

* 121921
* 123000
* 282828
* 293000
* 321000
* 321123
* 636863
* 713131
* 765432
* 777000
* 839234
* 848484
* 888444
* 929394
* 987600
* 999000

## Creating a Patron Code **EXPERIMENTAL**

{% reqspec %}
  POST '/api/patron-codes'
  auth 'jwt'
{% endreqspec %}

{% h4 Example Response Payload %}

```json
{
  "id": "V17FByEP9gm1shSG6a1Zzx",
  "barcode": "9990001234567895",
  "createdAt": "2021-06-08T22:55:00.000Z",
  "createdBy": "crn::user:1234",
  "expiresAt": "2021-06-08T23:00:00.000Z",
  "appName": "centrapay"
}
```

The `appName` field in the Patron Code represents information about the app that generated the code.
It is used to apply discounts or restrict payment options for the payment request created.

You can find payment request information attached to a Patron Code by [polling for the Payment
Request][polling] using the transacting APIs.

## Retrieving a Patron Code by id

{% reqspec %}
  GET '/api/patron-codes/{patronCodeId}'
  auth 'jwt'
  path_param 'patronCodeId', 'V17FByEP9gm1shSG6a1Zzx'
{% endreqspec %}

{% h4 Example Response Payload %}

```json
{
  "id": "V17FByEP9gm1shSG6a1Zzx",
  "barcode": "9990001234567895",
  "createdAt": "2021-06-08T22:55:00.000Z",
  "createdBy": "crn::user:1234",
  "expiresAt": "2021-06-08T23:00:00.000Z",
  "appName": "centrapay"
}
```

## Retrieving a Patron Code by Barcode

{% reqspec %}
  GET '/api/patron-codes/barcode/{barcode}'
  auth 'api-key'
  path_param 'barcode', '9990001234567895'
{% endreqspec %}

{% h4 Example Response Payload %}

```json
{
  "id": "V17FByEP9gm1shSG6a1Zzx",
  "barcode": "9990001234567895",
  "createdAt": "2021-06-08T22:55:00.000Z",
  "createdBy": "crn::user:1234",
  "expiresAt": "2021-06-08T23:00:00.000Z",
  "appName": "centrapay"
}
```

[polling]: {% link api/payment-requests/payment-requests.md %}#patron-code
