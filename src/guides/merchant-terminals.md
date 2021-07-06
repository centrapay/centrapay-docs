---
layout: default
parent: Guides
nav_order: 2
title: Merchant Terminals
permalink: /guides/merchant-terminals
---

# Integrating Merchant Terminals

Integrating a merchant terminal with Centrapay APIs requires creating,
cancelling, voiding and refunding [Payment Requests][] on behalf of Merchants
using a "merchant terminal" API key.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## API Keys

To create API keys, you first need to get in touch with Centrapay to be issued an Integrator Account
and an "account owner" API key. An "account owner" is a special kind of role that allows you to
manage your account.

You can use this key to [Create an API Key][] with the "merchant terminal" role. A "merchant terminal"
key has a role that can create, cancel, void and refund Payment Requests on behalf of merchants.

{% warning You are responsible for the safety of your API keys %}


## Merchant Configs

Centrapay [Merchant Configs][] represent an available set of configured
payment methods that can be utilized by one or more payment terminals by a
Merchant.

Merchants and merchant configs are managed by Centrapay. The only
details you need to be able to create payment requests on their behalf are the
`merchantId` and `merchantConfigId` (aka `clientId`). Centrapay will send you
these details through whatever channel works for you. Please get in touch to
let us know.

In the future Centrapay will allow an integrator to on-board their own
merchants through APIs using integrator API keys.


## Example Flows

See [Payment Flows][] for an overview of the API calls required for different payment flows.


## Displaying QR Codes

Centrapay QR codes should be displayed with a Centrapay logo in the Center.
See [Centrapay Brand Assets][]{:.external}.


## Integration Architecture

We strongly recommend Centrapay APIs are invoked from your backend and not
directly from your payment terminals. Centralizing the invocation of our APIs
from your backend offers the following benefits:

1. Merchant network administrators will not need to make additional firewall
   changes.
2. Your Centrapay API Keys can be managed centrally inside your secured
   network.
3. TLS negotiation with Centrapay APIs can be managed independently of terminal
   hardware and software updates.


## Mitigating Network Issues

The following mitigations will be helpful to deal with inconsistencies in
Payment Request statuses due to network issues and race conditions:

{% h4 Respect Payment Request Status  %}

Use the Payment Request status as the source of truth when determining if a
Payment Request is paid or expired. For example, if cancelling a Payment
Request fails with a `REQUEST_PAID` error then terminal should respond
accordingly; either show transaction as paid or initiate a void instead.

{% h4 Timeout Offset %}

Payment Requests have a configurable timeout which defaults to 2 minutes.
Payment integrators should make sure that the payment terminal times out 5-10
seconds **after** the payment request. For example, if the payment terminal has
a 90 second payment timeout then the Payment Request could be created with an
85 second timeout to prevent the payment terminal expiring at the same time as
the payment request is paid.



## Polling vs Webhooks

Integrators can optionally take advantage of [Payment Request Webhooks][] to
help improve responsiveness to Payment Request status changes. However,
integrators **must not** rely solely on webhooks and **must** fall back to
polling the [Get Payment Request][] endpoint to reliably detect when a Payment
Request is paid.


[Create an API Key]: {% link api/api-keys.md %}#create-api-key
[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[Merchant Configs]: {% link api/merchants/merchant-configs.md %}
[Get Payment Request]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-info
[Payment Request Webhooks]: {% link api/payment-requests/legacy-payment-requests.md %}#webhooks
[Payment Flows]: {% link guides/payment-flows.md %}
[Centrapay Brand Assets]: https://centrapay.com/brand-assets/
