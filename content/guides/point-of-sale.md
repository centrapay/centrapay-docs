---
title: Point of Sale
---

Integrating a point of sale (POS) terminal with Centrapay APIs allows merchants to accept payment via any Centrapay-enabled apps without installing additional POS hardware or software.

## Core Requirements

Centrapay POS integrations must be able to [create](https://docs.centrapay.com/api/payment-requests#create-a-payment-request), [void](https://docs.centrapay.com/api/payment-requests#void-a-payment-request-experimental) and [refund](https://docs.centrapay.com/api/payment-requests#refund-a-payment-request-experimental) Payment Requests on behalf of Merchants.

The POS authenticates against Centrapay APIs using a single “merchant terminal” API key.

- [Requesting Payment](/guides/requesting-payment) MUST connect with the patron using either the [QR Code Flow for Merchants](/guides/merchant-integration-qr-code-flow) or the [Barcode Flow for Merchants](/guides/merchant-integration-barcode-flow).
- [Merchant integration errors](https://docs.centrapay.com/guides/merchant-integration-error-handling) MUST be handled correctly.
- [Initiating refunds](https://docs.centrapay.com/guides/initiating-refunds) MUST be performed using the `externalRef` or `shortCode` [Payment Request](https://docs.centrapay.com/api/payment-requests#payment-request) fields.
- At least one of `externalRef` and `shortCode` MUST be available to the patron (eg, on paper print-out).
- Paid [Asset Types](https://docs.centrapay.com/api/asset-types) MUST be made available for merchant [Transaction Reporting](/guides/transaction-reporting).

### Optional Protocol Extensions

- [Payment Request Line Items](/guides/payment-request-line-items)
- [Merchant Payment Conditions](/guides/merchant-payment-conditions)
- [Requesting Pre Auth](/guides/requesting-pre-auth)
- [Patron Not Present](/guides/patron-not-present)


## Contact Us

Contact [`integrations@centrapay.com`](mailto:integrations@centrapay.com) to get started with API keys.

Once you have confirmed your integration needs we will then provide you with a customised integration checklist for certification.
