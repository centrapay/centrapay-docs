A wallet represents a balance in a certain currency, that a given centrapay account has access to. 

## Creating a wallet 

POST `https://service.centrapay.com/api/wallets`

```
curl -X POST "https://service.centrapay.com/api/wallets" \
-H "x-api-key: 1234" \
-H "content-type: application/json" \
-d '{"accountId":"Te2uDM7xhDLWGVJU3nzwnh", "ledgerId":"centrapay.nzd.live"}'
```

**Required Fields**

| Field     | Type   | Description                                                      |
| accountId | String | The id of the account                                            |
| ledgerId  | String | The id of the ledger e.g. centrapay.nzd.live, centrapay.nzd.test |

**Example response payload**

```
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "ledgerId": "centrapay.nzd.live",
  "currency": "NZD",
  "balance": "2000" 
}
```

## Listing authorized wallets

GET `https://service.centrapay.com/api/wallets`

```
curl -X GET "https://service.centrapay.com/api/wallets" \
-H "x-api-key: 1234" 
```

**Example response payload**

```
[{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "ledgerId": "centrapay.nzd.live",
  "currency": "NZD",
  "balance": "2000" 
},
{
  "id": "NQ1yeromwnWPD2hY41L2yS",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "ledgerId": "centrapay.nzd.test",
  "currency": "NZD",
  "balance": "20" 
}]
```
