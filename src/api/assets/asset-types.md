---
layout: default
grand_parent: API Reference
parent: Assets
title: Asset Types
permalink: /api/asset-types
---

# Supported Asset Types

The following table describes the Asset Types supported for payments.

The Category column describes an Asset's representation in Centrapay. When blank, the Asset is not
tracked by a Centrapay Account.

| Asset Type         | Category     |             Description              |
| :----------------- |:-------------| :----------------------------------- |
| centrapay.nzd.main | [Money][]    | Centrapay NZD wallet                 |
| centrapay.nzd.test | [Money][]    | Centrapay NZD wallet (test ledger)   |
| epay.nzd.main      | [Giftcard][] | EPay NZ giftcards                    |
| epay.nzd.test      | [Giftcard][] | EPay NZ giftcards (test ledger)      |
| cca.coke.main      | [Token][]    | Coke tokens                          |
| cca.coke.test      | [Token][]    | Coke tokens (test ledger)            |
| bitcoin.main       |              | [Bitcoin][]{:.external}              |
| cennznet.main      |              | [CENNZnet][]{:.external}             |
| zap.main           |              | [Zap tokens][]{:.external}           |
| pocketvouchers     |              | [Pocket Vouchers][]{:.external}      |
| test               |              | No-op test payment (always approved) |

[Money]: {% link api/assets/assets.md %}#money
[Giftcard]: {% link api/assets/assets.md %}#giftcards
[Token]: {% link api/assets/assets.md %}#tokens
[Bitcoin]: https://bitcoin.org/en/
[CENNZnet]: https://cennznet.io
[Zap tokens]: https://www.zap.org/
[Pocket Vouchers]: https://centrapay.com/pocket-vouchers/
