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

## Models

### Patron Code **EXPERIMENTAL**

{% h4 Fields %}

|      Field       |        Type        |                            Description                            |
| :--------------- | :----------------- | :---------------------------------------------------------------- |
| id               | String             | The Patron Code's unique identifier.                              |
| barcode          | String             | ✩ Field to display in barcode format.                             |
| createdAt        | {% dt Timestamp %} | Date when the Patron Code was created.                            |
| expiresAt        | {% dt Timestamp %} | Date when the Patron Code will expire.                            |
| appName          | String {% opt %}   | The app used to create the Patron Code. **DEPRECATED**            |
| accountId        | String             | The account id of the creator of the patron code.                 |
| testScenarioName | String {% opt %}   | The [Test Scenario Name](#test-scenario-name) of the Patron Code. |


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

### Test Scenario Name

This field is used to inject behavior into a [Payment Request][] when the
generated barcode is supplied on creation. If a Test Scenario Name is
defined on a Patron Code, it is considered a test resource and can only
be used with Payment Requests that will have a liveness of 'test'. The [Asset Type][]
`centrapay.nzd.test` is required to run test scenarios.

|              name              |                                    description                                     |
| :----------------------------- | :--------------------------------------------------------------------------------- |
| force-condition-check-photo-id | The Payment Request will have a required [Merchant Condition][] to check photo id. |

## Operations

### Creating a Patron Code **EXPERIMENTAL**

{% reqspec %}
  POST '/api/patron-codes'
  auth 'jwt'
{% endreqspec %}

{% h4 Example Response Payload %}

{% json %}
{
  "id": "V17FByEP9gm1shSG6a1Zzx",
  "accountId" : "Jaim1Cu1Q55uooxSens6yk",
  "barcode": "9990001234567895",
  "createdAt": "2021-06-08T22:55:00.000Z",
  "expiresAt": "2021-06-08T23:00:00.000Z",
  "appName": "centrapay"
}
{% endjson %}

You can find payment request information attached to a Patron Code by [polling for the Payment
Request][polling] using the transacting APIs.

### Retrieving a Patron Code

{% reqspec %}
  GET '/api/patron-codes/{patronCodeId}'
  auth 'jwt'
  path_param 'patronCodeId', 'V17FByEP9gm1shSG6a1Zzx'
{% endreqspec %}

{% h4 Example Response Payload %}

{% json %}
{
  "id": "V17FByEP9gm1shSG6a1Zzx",
  "accountId" : "Jaim1Cu1Q55uooxSens6yk",
  "barcode": "9990001234567895",
  "createdAt": "2021-06-08T22:55:00.000Z",
  "expiresAt": "2021-06-08T23:00:00.000Z",
  "appName": "centrapay"
}
{% endjson %}

### Retrieving a Patron Code by Barcode

{% reqspec %}
  GET '/api/patron-codes/barcode/{barcode}'
  auth 'api-key'
  path_param 'barcode', '9990001234567895'
{% endreqspec %}

{% h4 Example Response Payload %}

{% json %}
{
  "id": "V17FByEP9gm1shSG6a1Zzx",
  "accountId" : "Jaim1Cu1Q55uooxSens6yk",
  "barcode": "9990001234567895",
  "createdAt": "2021-06-08T22:55:00.000Z",
  "expiresAt": "2021-06-08T23:00:00.000Z",
  "appName": "centrapay"
}
{% endjson %}

{% h4 Error Responses %}

| Status |          Code                     |          Description                          |
| :----- | :---------------------------------| :---------------------------------------------|
| 400    | {% break _ CHECKSUM_FAILED %}     | Luhn checksum digit doesn't pass.             |
| 403    | {% break _ PATRON_CODE_INVALID %} | Patron Code doesn't exist or it has expired. |


[polling]: {% link api/payment-requests/payment-requests.md %}#patron-code
[Payment Request]: {% link api/payment-requests/payment-requests.md %}
[Merchant Condition]: {% link api/payment-requests/payment-requests.md %}#merchant-condition
[Asset Type]: {% link api/assets/asset-types.md %}