---
layout: default
parent: Guides
nav_order: 2
title: Merchant Terminals
permalink: /guides/merchant-terminals
---

# Integrating Merchant Terminals

To integrate a merchant terminal with Centrapay APIs, you need to manage Merchant IDs, Merchant
Configuration IDs and API keys.

To create API keys, you first need to get in touch with Centrapay to be issued an Integrator Account
and an "account owner" API key. An "account owner" is a special kind of role that allows you to
manage your account.

You can use this key to create and manage "merchant terminal" [API Keys][]. A "merchant terminal"
key has a role that can create, cancel, void and refund [Payment Requests][] on behalf of merchants.

{% warning You are responsible for the safety of your API keys %}

Merchant credentials are managed by Centrapay when we onboard them. The only details you need to be
able to create payment requests on their behalf are the `merchantId` and `clientId`. Centrapay will
send you these details through whatever channel works for you. Please get in touch to let us know.

In the future Centrapay will allow an integrator to on-board their own merchants through APIs using
integrator API keys.

[API Keys]: {% link api/api-keys.md %}#create-api-key
[Payment Requests]: {% link guides/payment-flows.md %}
