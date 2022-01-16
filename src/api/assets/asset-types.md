---
layout: default
grand_parent: API Reference
parent: Assets
title: Asset Types
permalink: /api/asset-types
---

# Supported Asset Types

The following table describes the Asset Types supported for payments.

The Category column refers to the Centrapay asset type representation if
applicable. When blank, the Asset is not managed by a Centrapay Account.

|     Asset Type     |             Description              |   Category   | Flags |
| :----------------- | :----------------------------------- | :----------- | :---- |
| centrapay.nzd.main | Centrapay NZD wallet                 | [Money][]    |       |
| centrapay.nzd.test | Centrapay NZD wallet                 | [Money][]    | 🅃     |
| epay.nzd.main      | EPay NZ giftcards                    | [Giftcard][] |       |
| epay.nzd.test      | EPay NZ giftcards                    | [Giftcard][] | 🅃     |
| cca.coke.main      | Coke tokens                          | [Token][]    | 🚫     |
| cca.coke.test      | Coke tokens                          | [Token][]    | 🅃 🚫   |
| bitcoin.main       | [Bitcoin][]{:.external}              |              |       |
| cennznet.main      | [CENNZnet][]{:.external}             |              |       |
| zap.main           | [Zap tokens][]{:.external}           |              |       |
| pocketvouchers     | [Pocket Vouchers][]{:.external}      |              |       |
| paypal.usd.main    | [PayPal][]{:.external}               |              |       |
| paypal.usd.test    | [PayPal][]{:.external}               |              | 🅃     |
| test               | No-op test payment (always approved) |              | 🅃     |


{% h4 Flags %}

 * 🅃  : **Test Asset** -- Cannot be assigned to [Merchants] without the test flag.
 * 🚫 : **Restricted Asset** -- Cannot be used to pay for "restricted" [Line Items][].


[Money]: {% link api/assets/assets.md %}#money
[Giftcard]: {% link api/assets/assets.md %}#giftcards
[Token]: {% link api/assets/assets.md %}#tokens
[Payment Option Configs]: {% link api/merchants/merchant-configs.md %}#payment-option-config
[Merchants]: {% link api/merchants/merchants.md %}
[Line Items]: {% link api/payment-requests/payment-requests.md %}#line-item
[Bitcoin]: https://bitcoin.org/en/
[CENNZnet]: https://cennznet.io
[Zap tokens]: https://www.zap.org/
[Pocket Vouchers]: https://centrapay.com/pocket-vouchers/
[PayPal]: https://www.paypal.com/
