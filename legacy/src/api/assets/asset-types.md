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

|      Asset Type      |             Description              |   Category   |       Currencies        | Flags |
| :------------------- | :----------------------------------- | :----------- | :---------------------- | :---- |
| bitcoin.main         | [Bitcoin][]{:.external}              |              | NZD, AUD                |       |
| cca.coke.main        | Coke tokens                          | [Token][]    | NZD                     | 🚫     |
| cca.coke.test        | Coke tokens                          | [Token][]    | NZD                     | 🅃 🚫   |
| cennznet.main        | [CENNZnet][]{:.external}             |              | NZD                     |       |
| centrapay.nzd.main   | Centrapay NZD wallet                 | [Money][]    | NZD                     |       |
| centrapay.nzd.test   | Centrapay NZD wallet                 | [Money][]    | NZD                     | 🅃     |
| centrapay.token.main | Centrapay tokens                     | [Token][]    | NZD                     |       |
| centrapay.token.test | Centrapay tokens                     | [Token][]    | NZD                     | 🅃     |
| epay.nzd.main        | EPay NZ giftcards                    | [Giftcard][] | NZD                     |       |
| epay.nzd.test        | EPay NZ giftcards                    | [Giftcard][] | NZD                     | 🅃     |
| farmlands.nzd.main   | [Farmlands][]{:.external}            | [Money][]    | NZD                     | 💸💼    |
| farmlands.nzd.test   | [Farmlands][]{:.external}            | [Money][]    | NZD                     | 🅃💸💼   |
| kete.nzd.main        | Kete NZD asset                       |              | NZD                     |       |
| kete.nzd.test        | Kete NZD asset                       |              | NZD                     | 🅃     |
| paypal.main          | [PayPal][]{:.external}               |              | USD                     | 💸     |
| paypal.test          | [PayPal][]{:.external}               |              | USD                     | 🅃 💸   |
| pocketvouchers       | [Pocket Vouchers][]{:.external}      |              | NZD                     |       |
| quartz.nzd.main      | Quartz NZD asset                     |              | NZD                     |       |
| quartz.nzd.test      | Quartz NZD asset                     |              | NZD                     | 🅃     |
| test                 | No-op test payment (always approved) |              | NZD                     | 🅃     |
| venmo.main           | [Venmo][]{:.external}                |              | USD                     | 💸     |
| venmo.test           | [Venmo][]{:.external}                |              | USD                     | 🅃 💸   |
| zap.main             | [Zap tokens][]{:.external}           |              | NZD                     |       |
| uplinkapi.test       | Uplink API Test asset                |              | NZD                     | 🅃     |
| stadius.main         | [Stadius][]{:.external}              |              | NZD, AUD, USD, CAD, EUR |       |
| stadius.test         | [Stadius][]{:.external}              |              | NZD, AUD, USD, CAD, EUR | 🅃     |


{% h4 Flags %}

 * 🅃  : **Test Asset** -- Cannot be assigned to [Merchants] without the test flag.
 * 🚫 : **Restricted Asset** -- Cannot be used to pay for "restricted" [Line Items][].
 * 💸 : **Supports Quick Pay** -- Can be used to quick pay a [Payment Request][].
 * 💼 : **Requires Tax Number** -- [Tax Number][] must exist on the Merchant's Business to transact this asset type.


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
[Farmlands]: https://www.farmlands.co.nz/
[Stadius]: https://stadius.io/
[Tax Number]: {% link api/accounts/businesses.md %}#tax-number
