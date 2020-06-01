# Accounts API 

An account represents a subsription to centrapay services and it owns resources within centrapay such as merchants and wallets.
Accounts will have apiKeys and users associated with them. Account membership grants access to all resources owned by the account.  

## Creating an account

POST `https://service.centrapay.com/api/accounts`

```
curl -X POST "https://service.centrapay.com/api/accounts" \
-H "x-api-key: 1234" \
-d '{"name":"Centrapay Cafe"}'
```

**Required Fields**

| Field | Type   | Description             |
| name  | String | The name of the account |

**Example response payload**

```
{
  "id": "5d7a4430-9960-11ea-8f5c-97c91f485570",
  "name": "Centrapay Cafe"
}
```

## Get information about an account

GET `https://service.centrapay.com/api/accounts/{accountId}`

```
curl -X GET "https://service.centrapay.com/api/accounts/5d7a4430-9960-11ea-8f5c-97c91f485570" \
-H "x-api-key: 1234" 
```

**Example response payload**

```
{
  "id": "5d7a4430-9960-11ea-8f5c-97c91f485570",
  "name": "Centrapay Cafe"
}
```

## Update an account


PUT `https://service.centrapay.com/api/accounts/{accountId}`

```
curl -X PUT "https://service.centrapay.com/api/accounts/5d7a4430-9960-11ea-8f5c-97c91f485570" \
-H "x-api-key: 1234" \
-d '{"name":"Shortland St Cafe"}'
```

**Required Fields**

| Field | Type   | Description             |
| name  | String | The name of the account |

**Example response payload**

```
{
  "id": "5d7a4430-9960-11ea-8f5c-97c91f485570",
  "name": "Shortland St Cafe"
}
```
