---
layout: default
parent: Guides
nav_order: 2
title: Payment Flows
permalink: /guides/payment-flows
---

# Payment Flows

Transacting via Centrapay requires customer and merchant devices to negotiate
the creation and fulfillment of [Payment Requests][].  There are multiple
payment "flows" a merchant integration can select from to facilitate this
negotiation.  Which flow is employed will depend on the capabilities of the
merchant system.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Dynamic Merchant QR Code

When a merchant terminal has a customer-facing display it can prompt the
customer to pay by showing a QR code.

1. Merchant terminal [creates a payment request][] via Centrapay API and shows QR
   code on customer-facing display.
2. Customer device scans the QR code, fetches the [payment request details][],
   and [completes payment][] as normal.
3. Merchant terminal displays transaction result using the [payment request details][].


## Dynamic Patron Barcode

When a merchant terminal is not capable of displaying a customer-facing QR code
then the payment request can be negotiated with the customer by scanning a
barcode or QR code displayed on the customer's smart device.

1. Customer generates a short-lived [patron code][] via Centrapay API and displays
   it as a barcode on their smart device.
2. Merchant scans the barcode and [creates a Payment Request][] via Centrapay API,
   with the patron code as a parameter.
3. Customer device uses patron code to [fetch the payment request] and completes
   payment as normal.

## Static Merchant QR Code

When a merchant terminal is neither capable of displaying nor scanning QR codes
or barcodes, such as for unattended vending machines, then a static QR code can
be used.

1. Customer scans QR code and initiates vending sequence via Centrapay API,
   with the merchant code as a parameter.
2. Merchant vending system initiates payment request via Centrapay API.
3. Customer device fetches payment request and completes payment as normal.
4. Merchant vending system optionally initiates refund via Centrapay API.


[Payment Requests]: {% link api/payment-requests/legacy-payment-requests.md %}
[Creates a Payment Request]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-create
[Payment Request Details]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-info
[Completes Payment]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-pay
[Patron Code]: {% link api/patron-codes.md %}
[Fetch the Payment Request]: {% link api/payment-requests/legacy-payment-requests.md %}#patron-code
