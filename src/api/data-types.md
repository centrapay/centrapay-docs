---
layout: default
nav_order: 2
parent: API Reference
title: Data Types
permalink: /api/data-types
---

# Data Types


## Timestamp

A point in time, usually with millisecond precision, represented as an
[ISO8601][]{:.external} date string (eg "2021-06-11T02:51:11.000Z"). Timestamps
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
typically represented as an [ISO4217][]{:.external} code.

{% h4 Fields %}

| Name     | Type               | Description                                                |
|----------|--------------------|------------------------------------------------------------|
| amount   | {% dt BigNumber %} | Value in the currency's smallest denomination (eg. cents). |
| currency | String             | Currency code (eg. "NZD").                                 |


[ISO8601]: https://en.wikipedia.org/wiki/ISO_8601
[ISO4217]: https://en.wikipedia.org/wiki/ISO_4217
