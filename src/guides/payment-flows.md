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

## Merchant-presented

When a merchant terminal has a customer-facing display it can prompt the
customer to pay by showing a QR code.

### Dynamic Merchant QR Code

1. Merchant terminal [creates a payment request][] via Centrapay API and shows QR
   code on customer-facing display.
2. Customer device scans the QR code, fetches the [payment request details][],
   and [completes payment][] as normal.
3. Merchant terminal displays transaction result using the [payment request details][].

### Static Merchant QR Code

When a merchant terminal is neither capable of displaying nor scanning QR codes
or barcodes, such as for unattended vending machines, then a static QR code can
be used.

1. Customer scans QR code and initiates vending sequence via Centrapay API,
   with the merchant code as a parameter.
2. Merchant vending system initiates payment request via Centrapay API.
3. Customer device fetches payment request and completes payment as normal.
4. Merchant vending system optionally initiates refund via Centrapay API.

## Patron-presented

When a merchant terminal is not capable of displaying a customer-facing QR code,
then the payment request can be negotiated with the customer by scanning a
barcode or QR code displayed on the customer's smart device.

### Dynamic Patron Barcode

1. Customer generates a short-lived [Patron Code][] via Centrapay API and displays
   it as a barcode on their smart device
2. Merchant scans the barcode, optionally [retrieves the Patron Code][] for additional
   information on the customer and then [creates a Payment Request][] via Centrapay API,
   with the Patron Code as a parameter.
3. Customer device [fetches the payment request] created with the Patron Code and completes
   payment as normal.

### Static Patron Barcode

Variant on Dynamic Patron Code, if you've setup long lived static Patron Codes by integrating with
Centrapay, then you can use these to pay on behalf of a Customer. The customer may be asked for
approval before this goes through.

1. The Customer presents their [Patron Code][] barcode.
2. Merchant scans the barcode, optionally [retrieves the Patron Code][] for additional
   information on the Customer and then [creates a Payment Request][] via Centrapay API,
   with the Patron Code as a parameter.
3. Conditionally, the Customer is sent a text message to confirm payment.
4. The Customer is sent an email with a summary of the payment.
5. Merchant polls [Polls for the Payment Request][] created with the Patron Code checking the status
   changes to "paid". Merchant completes payment as normal.

<img src="{{site.url}}/images/static-patron-code-flow.svg" style="display: block; margin: auto;" />

### Quick Pay

Quick pay is used to pay the payment request immediately after it's created, without requiring patron approval.
Quick pay can only be triggered using the patron-presented flows, and the patron barcode must be linked to an
asset type that allows quick pay. See [Asset Types][] for the list of asset types that support Quick Pay.

[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[Asset Types]: {% link api/assets/asset-types.md %}
[Creates a Payment Request]: {% link api/payment-requests/payment-requests.md %}#create-a-payment-request
[Payment Request Details]: {% link api/payment-requests/payment-requests.md %}#get-a-payment-request-by-id
[Completes Payment]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-pay
[Patron Code]: {% link api/patron-codes.md %}
[Retrieves the Patron Code]: {% link api/patron-codes.md %}#retrieving-a-patron-code-by-barcode
[Fetches the Payment Request]: {% link api/payment-requests/payment-requests.md %}#get-a-payment-request-by-id
[Polls for the Payment Request]: {% link api/payment-requests/payment-requests.md %}#get-a-payment-request-by-id