---
layout: default
parent: Guides
title: eCommerce
nav_order: 3
permalink: /guides/ecommerce
---

# eCommerce Website

eCommerce websites accepting payments via Centrapay may want to redirect their uesrs back to their website after they pay/cancel the payment request. In order to do this, the eCommerce website must add `allowedRedirectUrls` to it's [Merchant Config][].

After `allowedRedirectUrls` have been added to the Merchant Config, the eCommerce website can simply pass in their `redirectUrl` when creating a [Payment Request][].


{% reqspec %}
  POST '/api/payment-requests'
  auth 'api-key'
  example {
    title 'Create a Payment Request with redirectUrl'
    body ({
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '8991', currency: 'NZD' },
      redirectUrl: 'https://www.example.com/store/checkout'
    })
  }
{% endreqspec %}


[Merchant Config]: {% link api/merchants/merchant-configs.md %}
[Payment Request]: {% link api/payment-requests/payment-requests.md %}
