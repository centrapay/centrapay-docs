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
[ISO8601][] date string (eg "2021-06-11T02:51:11.000Z"). Timestamps are in the
UTC timezone as denoted by the "Z" suffix.


## BigNumber

A number, represented as a String, which can have arbitrary size or precision.
Most Centrapay APIs that deal with transactable value (ie. assets, payments,
etc) represent the value as BigNumbers. Depending on the context, a BigNumber
may be used to represent an integer or a decimal amount.


[ISO8601]: https://en.wikipedia.org/wiki/ISO_8601
