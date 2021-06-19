---
layout: default
parent: API Reference
title: Merchants
permalink: /api/merchants
redirect_from:
  - /merchants
---

# Merchants
{:.no_toc}

A merchant is member of the centrapay account. Merchant can have different
configurations with different payment methods.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Creating merchant

{% reqspec %}
  POST '/api/merchants'
  auth 'api-key'
  body ({
    accountId: 'C4QnjXvj8At6SMsEN4LRi9',
    name: 'Centrapay Cafe Auckland',
    country: 'NZ',
    test: false,
  })
{% endreqspec %}


{% h4 Required Fields %}

|   Field   |  Type   |                Description                |
| :-------- | :------ | :---------------------------------------- |
| accountId | String  | Owning account reference                  |
| name      | String  | Merchant name                             |
| country   | String  | Merchants country in alpha 2 standard     |
| test      | Boolean | Flag configuring if this is test merchant |

{% h4 Optional Fields %}

|      Field       |  Type  |                 Description                 |
| :--------------- | :----- | :------------------------------------------ |
| settlementConfig | Object | **EXPERIMENTAL** Merchant settlement config |

{% h4 Example response payload %}

```json
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Parisian - Brown",
  "country": "AD",
  "test": false
}
```

## Get information about a merchant

{% reqspec %}
  GET '/api/merchants/{merchantId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

```json
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Parisian - Brown",
  "test": false,
  "country": "AD"
}
```

## List all merchants

{% reqspec %}
  GET '/api/merchants'
  auth 'api-key'
{% endreqspec %}


{% h4 Example response payload %}

```json
{
  "items": [
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "BT",
      "id": "5f6bf6ff81552101f8ff6122",
      "name": "Adams, Runolfsdottir and Botsford",
      "test": true
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "GM",
      "id": "5f6bf6ff81552101f8ff6123",
      "name": "Vandervort Inc",
      "test": false
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "MZ",
      "id": "5f6bf6ff81552101f8ff6124",
      "name": "West, O'Reilly and Huels",
      "test": true
    },
  ]
}
```

## Update a merchant

{% reqspec %}
  PUT '/api/merchants/{merchantId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  body ({
    name: 'Centrapay Café'
  })
{% endreqspec %}


{% h4 Optional Fields %}

|      Field       |  Type  |                 Description                 |
| :--------------- | :----- | :------------------------------------------ |
| name             | String | Merchant name                               |
| country          | String | Merchants country in alpha 2 standard       |
| settlementConfig | Object | **EXPERIMENTAL** Merchant settlement config |

{% h4 Example response payload %}

```json
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Centrapay Café",
  "test": false,
  "country": "NZ"
}
```

## Creating merchant configuration

{% reqspec %}
  POST '/api/merchants/{merchantId}/configs/'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  body ({
    paymentOptions: [
      { type: 'centrapay.nzd.main', 'walletId': '1234c486308f3f0a23f0f92b' },
      { type: 'epay.nzd.main', 'terminalId': '11000021' },
      { type: 'pocketvouchers' },
    ]
  })
{% endreqspec %}

See [Merchant configuration model](#config-model) for expected request body format.

{% h4 Example response payload %}

```json
{
  "id": "5ee168e8597be5002af7b454",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
        "type": "pocketvouchers"
    },
    {
      "type": "centrapay.nzd.test",
      "walletId": "1234c486308f3f0a23f0f92b"
    }
  ]
}
```

## Get merchant configuration

{% reqspec %}
  GET '/api/merchants/{merchantId}/configs/{configId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  path_param 'configId', '5ee168e8597be5002af7b454'
{% endreqspec %}


{% h4 Example response payload %}

```json
{
  "id": "5ee168e8597be5002af7b454",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
      "type": "pocketvouchers"
    }
  ]
}
```

## List merchant configurations

{% reqspec %}
  GET '/api/merchants/{merchantId}/configs/'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

```json
[
  {
    "id": "5ee168e8597be5002af7b454",
    "merchantId": "5ee0c486308f590260d9a07f",
    "paymentOptions": [
      {
        "type": "pocketvouchers"
      }
    ]
  },
  {
    "id": "5ee168e8597be5002af7baed",
    "merchantId": "5ee0c486308f590260d9a07f",
    "paymentOptions": [
      {
        "type": "test"
      }
    ]
  }
]
```

## Update merchant configuration

{% reqspec %}
  PUT '/api/merchants/{merchantId}/configs/{configId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  path_param 'configId', '5ee168e8597be5002af7baed'
  body ({
    paymentOptions: [
      { type: 'bitcoin.main' },
      { type: 'centrapay.nzd.test', walletId: '1234c486308f3f0a23f0f92b' }
    ]
  })
{% endreqspec %}

See [Merchant configuration model](#config-model) for expected request body format.

{% h4 Example response payload %}

```json
{
  "id": "5ee168e8597be5002af7baed",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
      "type": "bitcoin.main"
    },
    {
      "type": "centrapay.nzd.test",
      "walletId": "1234c486308f3f0a23f0f92b"
    }
  ]
}
```

<span id="config-model"></span>
## Merchant configuration model

{% h4 Required Fields %}

| Field                                 | Type   | Description                                                |
| :------------------------------------ | :----- | :--------------------------------------------------------  |
| paymentOptions                        | Array  | Array of paymentOptions objects                            |
| paymentOptions[\*]                    | Object | Object containing paymentOption properties                 |
| {% break . paymentOptions[\*].type %} | String | Type of payment method. See supported payment types below. |

{% h4 Optional Fields %}

| Field                                               | Type   | Description                                                                          |
|:----------------------------------------------------|:-------|:-------------------------------------------------------------------------------------|
| {% break . paymentOptions[\*].walletId %}           | String | Merchant's Centrapay wallet to receive payments. Required for `centrapay.nzd` types. |
| {% break . paymentOptions[\*].terminalId %}         | String | Merchant's Epay terminal id.                                                         |
| {% break . paymentOptions[\*].wavesPublicAddress %} | String | Merchant's public waves address. Required for `zap.main` types.                      |

{% h4 Supported Payment Types %}

The following table describes the supported payment option types.

{% warning Test payment options should never be used for live merchant configurations. %}

|        Name        |             Description              |
| :----------------- | :----------------------------------- |
| centrapay.nzd.main | Centrapay NZD wallet                 |
| centrapay.nzd.test | Centrapay NZD wallet (test ledger)   |
| bitcoin.main       | Bitcoin                              |
| epay.nzd.main      | EPay NZ giftcards                    |
| epay.nzd.test      | EPay NZ giftcards (test ledger)      |
| cca.coke.main      | Coke tokens                          |
| cca.coke.test      | Coke tokens (test ledger)            |
| cennznet.main      | Cennznet                             |
| pocketvouchers     | Pocket Vouchers                      |
| zap.main           | Zap tokens                           |
| test               | No-op test payment (always approved) |
