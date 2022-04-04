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

|     Asset Type     |             Description              |   Category   | Currencies | Flags |
| :----------------- | :----------------------------------- | :----------- | :--------- | :---- |
| centrapay.nzd.main | Centrapay NZD wallet                 | [Money][]    | NZD        |       |
| centrapay.nzd.test | Centrapay NZD wallet                 | [Money][]    | NZD        | 🅃     |
| epay.nzd.main      | EPay NZ giftcards                    | [Giftcard][] | NZD        |       |
| epay.nzd.test      | EPay NZ giftcards                    | [Giftcard][] | NZD        | 🅃     |
| cca.coke.main      | Coke tokens                          | [Token][]    | NZD        | 🚫     |
| cca.coke.test      | Coke tokens                          | [Token][]    | NZD        | 🅃 🚫   |
| bitcoin.main       | [Bitcoin][]{:.external}              |              | NZD, AUD   |       |
| cennznet.main      | [CENNZnet][]{:.external}             |              | NZD        |       |
| zap.main           | [Zap tokens][]{:.external}           |              | NZD        |       |
| pocketvouchers     | [Pocket Vouchers][]{:.external}      |              | NZD        |       |
| paypal.main        | [PayPal][]{:.external}               |              | USD        | 💸     |
| paypal.test        | [PayPal][]{:.external}               |              | USD        | 🅃 💸   |
| venmo.main         | [Venmo][]{:.external}                |              | USD        | 💸     |
| venmo.test         | [Venmo][]{:.external}                |              | USD        | 🅃 💸   |
| kete.nzd.main      | Kete NZD wallet                      |              | NZD        |       |
| kete.nzd.test      | Kete NZD wallet                      |              | NZD        | 🅃     |
| test               | No-op test payment (always approved) |              | NZD        | 🅃     |


{% h4 Flags %}

 * 🅃  : **Test Asset** -- Cannot be assigned to [Merchants] without the test flag.
 * 🚫 : **Restricted Asset** -- Cannot be used to pay for "restricted" [Line Items][].
 * 💸 : **Supports Quick Pay** -- Can be used to quick pay a [Payment Request][].


[Money]: {% link api/assets/assets.md %}#money
[Giftcard]: {% link api/assets/assets.md %}#giftcards
[Token]: {% link api/assets/assets.md %}#tokens
[Payment Option Configs]: {% link api/merchants/merchant-configs.md %}#payment-option-config
[Payment Request]: {% link api/payment-requests/payment-requests.md %}#create-a-payment-request-quick-pay
[Merchants]: {% link api/merchants/merchants.md %}
[Line Items]: {% link api/payment-requests/payment-requests.md %}#line-item
[Bitcoin]: https://bitcoin.org/en/
[CENNZnet]: https://cennznet.io
[Zap tokens]: https://www.zap.org/
[Pocket Vouchers]: https://centrapay.com/pocket-vouchers/
[PayPal]: https://www.paypal.com/
[Venmo]: https://venmo.com/
