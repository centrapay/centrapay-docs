---
layout: default
nav_order: 4
parent: API Reference
title: Data Types
permalink: /api/data-types
---

# Data Types


## Timestamp

A point in time, usually with millisecond precision, represented as an
[ISO 8601][]{:.external} date string (eg "2021-06-11T02:51:11.000Z"). Timestamps
are in the UTC timezone as denoted by the "Z" suffix.


## BigNumber

A number, represented as a String, which can have arbitrary size or precision.
Most Centrapay APIs that deal with transactable value (ie. assets, payments,
etc) represent the value as BigNumbers. Depending on the context, a BigNumber
may be used to represent an integer or a decimal amount.


## Monetary

A monetary amount in a currency, represented as an Object. The amount is
usually an integer in the smallest denomination for the currency (ie cents) but
may be a decimal value for some currencies (eg Bitcoin). The currency is
typically represented as an [ISO 4217][]{:.external} code.

{% h4 Fields %}

|   Name   |        Type        |                        Description                         |
| -------- | ------------------ | ---------------------------------------------------------- |
| amount   | {% dt BigNumber %} | Value in the currency's smallest denomination (eg. cents). |
| currency | String             | Currency code (eg. "NZD").                                 |


## CRN

A Centrapay Resource Name (CRN) is a colon-delimited String that uniquely
identifies any Centrapay resource.

The format is `crn:{account}:{type}:{id}` where "account" is the optional
Centrapay account that owns the resource, "type" is the resource type, and "id"
is the resource identifier.

CRN is often used to refer to Users and API keys. For example:
* **User:** crn::user:e2837e88-d408-11eb-8eac-3e22fb52e878
* **API Key:** crn:1234abc:api-key:MyAccountOwner

## Location

A location's represented as an Object with properties to denote the location both absolute and
by locality.

{% h4 Required Fields %}

|   Name   |  Type  |                     Description                      |
| -------- | ------ | ---------------------------------------------------- |
| street   | String | Unit, number, and name of street address             |
| city     | String | City of location                                     |

{% h4 Optional Fields %}

|   Name   |  Type  |                     Description                      |
| -------- | ------ | ---------------------------------------------------- |
| lat      | Number | Absolute latitude coordinate                         |
| lng      | Number | Absolute longitude coordinate                        |
| suburb   | String | Suburb of location                                   |
| postCode | String | Post or Zip code of location                         |
| state    | String | The state or region of the location (eg. "Auckland") |


## PhoneNumber

A phone number, represented in [E.123][]{:.external} international notation (eg "+6421537663"). We usually use this for receiving text messages.

[E.123]: https://en.wikipedia.org/wiki/E.123
[ISO 8601]: https://en.wikipedia.org/wiki/ISO_8601
[ISO 4217]: https://en.wikipedia.org/wiki/ISO_4217
[ISO 3166]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
