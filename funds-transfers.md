# Funds Transfer APIs

A funds transfer represents either a top up to or a withdrawal from a Centrapay wallet. Topping up a wallet consists of making a bank transfer from the user's bank account to Centrapay. Once Centrapay has verified the transfer was successful a user will be given credit on their Centrapay wallet equal to the amount of the bank transfer.

## Contents 
{:.no_toc}

* TOC
{:toc}

## Creating a top up

**POST** `https://service.centrapay.com/api/topups`

```
curl -X POST "https://service.centrapay.com/api/topups" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "amount":"10000", "walletId":"Te2uDM7xhDLWGVJU3nzwnh", "bankAuthorityId":"FRhAzzWpTKb5U7pZygQjjY" }'
```

**Required Fields**

|      Field      |  Type  |               Description                |
| --------------- | ------ | ---------------------------------------- |
| amount          | String | Total amount of the transaction in cents |
| walletId        | String | The id of the wallet                     |
| bankAuthorityId | String | The id of the bank authority             |

**Example response payload**

```
{
 "id": "hg2RfYTQ635tPBZEPJdCre",
 "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
 "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
 "accountId": "aBc932S9182qwCDqwer",
 "type": "topup",
 "amount": "10000",
 "status": "created"
 "createdAt": "2020-05-01T12:30:00.000Z",
 "updatedAt": "2020-05-01T12:30:00.000Z"
}
```

## Getting a top up by id

**GET** `https://service.centrapay.com/api/topups/${id}`

```
curl -X GET "https://service.centrapay.com/api/topups/WRhAxxWpTKb5U7pXyxQjjY" \
  -H "x-api-key: 1234"
```

**Example response payload**

```
{
 "id": "hg2RfYTQ635tPBZEPJdCre",
 "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
 "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
 "accountId": "aBc932S9182qwCDqwer",
 "type": "topup",
 "amount": "10000",
 "status": "created"
 "createdAt": "2020-05-01T12:30:00.000Z",
 "updatedAt": "2020-05-01T12:30:00.000Z"
}
```

## List top ups for a bank authority

**GET** `https://service.centrapay.com/topups`

```
curl -X GET "https://service.centrapay.com/api/topups" \
  -H "x-api-key: 1234"
```

**Example response payload**

```
[{
 "id": "5thg2RPBZEfYTPJdQ63Cre",
 "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
 "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
 "accountId": "aBc932S9182qwCDqwer",
 "type": "topup",
 "amount": "10000",
 "status": "created"
 "createdAt": "2020-05-01T12:30:00.000Z",
 "updatedAt": "2020-05-01T12:30:00.000Z"
},
{
 "id": "hg2RfYTQ635tPBZEPJdCre",
 "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
 "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
 "accountId": "aBc932S9182qwCDqwer",
 "type": "topup",
 "amount": "10000",
 "status": "created"
 "createdAt": "2020-05-01T12:30:00.000Z",
 "updatedAt": "2020-05-01T12:30:00.000Z"
}]
```