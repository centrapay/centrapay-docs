---
title: Merchant Integration Error Handling
description: How to deal with inconsistencies in Payment Request statuses due to network issues or race conditions.
nav:
  path: Reference/Merchant Integrations
  title: Error Handling
  order: 5
---

Below are our guidelines for dealing with inconsistencies in [Payment Request](https://docs.centrapay.com/api/payment-requests#payment-request) statuses due to network issues or race conditions.

## Respect Payment Status

Use the Payment Request status as the source of truth when determining if a Payment Request is paid or expired. For example, if cancelling a Payment Request fails with a `REQUEST_PAID` error then the terminal should respond accordingly; either by showing the transaction as paid or [initiating a void](https://docs.centrapay.com/api/payment-requests#void-a-payment-request-experimental) instead.

### Void Unknown Status

If the status of a transaction cannot be determined to be successful after retrying, then the Payment Request should be voided. [Voiding a Payment Request](https://docs.centrapay.com/api/payment-requests#void) will cancel the request and trigger any refunds if necessary.

## Configure POS Timeout

Payment Requests have a configurable timeout which defaults to 2 minutes. Integrators should make sure that the payment terminal times out 5-10 seconds **after** the Payment Request.

For example, if the Point of Sale (POS) has a 90-second payment timeout then the Payment Request could be created with an 85-second timeout to prevent the payment terminal from expiring at the same time as the Payment Request is paid.

## Retry Unknown Errors

When faced with an unknown error while checking the status of a Payment Request, POS integrations should retry at least once before voiding the transaction.

> Retries should use the appropriate idempotency key where applicable.

## Resolving Persistent Errors

For issues that cannot be resolved, please reach out to Centrapay Support at [integrations@centrapay.com](mailto:integrations@centrapay.com).
