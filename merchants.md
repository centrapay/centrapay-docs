# Merchants API
{:.no_toc}

A merchant is member of the centrapay account. Merchant can have different configurations with different payment methods. 

## Experimental Features
{:.no_toc}

{% include experimental.md  %}

## Contents
{:.no_toc}

* TOC
{:toc}


## Creating merchant

POST `https://service.centrapay.com/api/merchants`

```
curl -X POST "https://service.centrapay.com/api/merchants" \
  -H "x-api-key: 123" \
  -H "content-type: application/json" \
  -d '{"accountId": "C4QnjXvj8At6SMsEN4LRi9", "name": "Centrapay Cafe Auckland", "country":"NZ", "test":false}'
```

**Required Fields**

|   Field   |  Type   |                Description                |
| --------- | ------- | ----------------------------------------- |
| accountId | String  | Owning account reference                  |
| name      | String  | Merchant name                             |
| country   | String  | Merchants country in alpha 2 standard     |
| test      | Boolean | Flag configuring if this is test merchant |

**Optional Fields**

|      Field       |  Type  |                 Description                 |
| ---------------- | ------ | ------------------------------------------- |
| settlementConfig | Object | **EXPERIMENTAL** Merchant settlement config |

**Example response payload**

```
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Parisian - Brown",
  "country": "AD",
  "test": false
}
```

## Get information about a merchant

GET `https://service.centrapay.com/api/merchants/{merchantId}`

```
curl -X GET "https://service.centrapay.com/api/merchants/5ee0c486308f590260d9a07f" \
  -H "x-api-key: 1234"
```

**Example response payload**

```
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Parisian - Brown",
  "test": false,
  "country": "AD"
}
```

## Update a merchant

PUT `https://service.centrapay.com/api/merchants/{merchantId}`

```
curl -X PUT "https://service.centrapay.com/api/merchants/5ee0c486308f590260d9a07f" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{"name": "Parisian - Orange"}'
```

**Optional Fields**

|      Field       |  Type  |                 Description                 |
| ---------------- | ------ | ------------------------------------------- |
| name             | String | Merchant name                               |
| country          | String | Merchants country in alpha 2 standard       |
| settlementConfig | Object | **EXPERIMENTAL** Merchant settlement config |

**Example response payload**

```
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Parisian - Orange",
  "test": false,
  "country": "AD"
}
```

## Creating merchant configuration

POST `https://service.centrapay.com/api/merchants/{merchantId}/configs/`

```
curl -X POST "https://service.centrapay.com/api/merchants/5ee0c486308f590260d9a07f/configs/" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "paymentOptions": [{ "type": "pocketvouchers" }] }'
```

**Required Fields**

|          Field          |  Type  |                                            Description                                             |
| ----------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| paymentOptions          | Array  | Array of paymentOptions objects                                                                    |
| paymentOptions[\*]      | Object | Object containing paymentOption properties                                                         |
| paymentOptions[\*].type | String | Type of payment. Supported types: 'test', 'pocketvouchers', 'bitcoin.main', 'centrapay.nzd.main', 'centrapay.nzd.test' |

**Example response payload**

```
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

## Get merchant configuration

GET `https://service.centrapay.com/api/merchants/{merchantId}/configs/{id}`

```
curl -X GET "https://service.centrapay.com/api/merchants/5ee0c486308f590260d9a07f/configs/5ee168e8597be5002af7b454" \
  -H "x-api-key: 1234"
```

**Example response payload** 

```
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

## List all merchant configurations

GET `https://service.centrapay.com/api/merchants/{merchantId}/configs/`

```
curl -X GET "https://service.centrapay.com/api/merchants/5ee0c486308f590260d9a07f/configs/" \
  -H "x-api-key: 1234"
```

**Example response payload** 

```
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

PUT `https://service.centrapay.com/api/merchants/{merchantId}/configs/{id}`

```
curl -X PUT "https://service.centrapay.com/api/merchants/5ee0c486308f590260d9a07f/configs/5ee168e8597be5002af7baed/" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "paymentOptions: [{ "type": "bitcoin.main" }]" }'
```

**Required Fields**

|          Field          |  Type  |                                                Description                                                |
| ----------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| paymentOptions          | Array  | Array of paymentOptions objects                                                                           |
| paymentOptions[\*]      | Object | Object containing paymentOption properties                                                                |
| paymentOptions[\*].type | String | Type of payment method. Supported types: 'test', 'pocketvouchers', 'bitcoin.main', 'centrapay.nzd.main', 'centrapay.nzd.test' |

**Example response payload** 
```
{
  "id": "5ee168e8597be5002af7baed",
  "merchantId": "5ee0c486308f590260d9a07f",
  "paymentOptions": [
    {
      "type": "bitcoin.main"
    }
  ]
}
```
