# Accounts API 

An account represents a subsription to centrapay services and it owns resources within centrapay such as merchants and wallets.
Accounts will have apiKeys and users associated with them. Account membership grants access to all resources owned by the account.  

## Creating an account

POST `https://service.centrapay.com/api/accounts`

```
curl -X POST "https://service.centrapay.com/api/accounts" \
-H "x-api-key: 1234" \
-H "content-type: application/json" \
-d '{"name":"Centrapay Cafe"}'
```

**Required Fields**

| Field | Type   | Description             |
| name  | String | The name of the account |

**Example response payload**

```
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Centrapay Cafe"
}
```

## Get information about an account

GET `https://service.centrapay.com/api/accounts/{accountId}`

```
curl -X GET "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk" \
-H "x-api-key: 1234" 
```

**Example response payload**

```
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Centrapay Cafe"
}
```

## Update an account


PUT `https://service.centrapay.com/api/accounts/{accountId}`

```
curl -X PUT "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk" \
-H "x-api-key: 1234" \
-H "content-type: application/json" \
-d '{"name":"Shortland St Cafe"}'
```

**Required Fields**

| Field | Type   | Description             |
| name  | String | The name of the account |

**Example response payload**

```
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Shortland St Cafe"
}
```

## Creating an API key

POST `https://service.centrapay.com/api/accounts/{accountId}/api-keys`

```
curl -X POST "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys" \
-H "x-api-key: 1234" \
-H "content-type: application/json" \
-d '{"name": "MyAPIkey", "role": "merchant-terminal"}'
```

**Required Fields**

| Field | Type   | Description                                                          |
| name  | String | The alphanumeric name of the API key, must be unique within account  |
| role  | String | API key role. Currently, only supported is "merchant-terminal"       |

**Example response payload**

```
{
  "name":"MyAPIkey",
  "createdAt":"2020-06-01T22:32:56.631Z",
  "enabled":true,
  "role":"merchant-terminal",
  "accountId":"Jaim1Cu1Q55uooxSens6yk",
  "apiKey":"EoaEL7skkedBBy9MzrBSyxG95vUAKjYkiFvWEfiAx"
}
```

## List account API keys

GET `https://service.centrapay.com/api/accounts/{accountId}/api-keys`

```
curl "http://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys"
```

**Example response payload**

```
[{
    "accountId":"Jaim1Cu1Q55uooxSens6yk",
    "name":"MyOtherAPIkey",
    "createdAt":"2020-06-01T21:57:25.888Z",
    "enabled":false,
    "role":"merchant-terminal"
  },{
    "accountId":"Jaim1Cu1Q55uooxSens6yk",
    "name":"MyAPIkey",
    "createdAt":"2020-06-01T22:34:31.308Z",
    "enabled":true,
    "role":"merchant-terminal"
}]
```

## Update account API key

PUT `https://service.centrapay.com/api/accounts/{accountId}/api-keys/{apikey-name}`

```
curl -X PUT "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys/MyAPIkey" \
-H "x-api-key: 1234" \
-H "content-type: application/json" \
-d '{"enabled": false}'
```

**Required Fields**

| Field    | Type    | Description            |
| enabled  | Boolean | Enable/Disable API key |

**Example response payload**

```
{
  "accountId":"Jaim1Cu1Q55uooxSens6yk",
  "name":"MyAPIkey",
  "createdAt":"2020-06-01T22:34:31.308Z",
  "enabled":false,
  "role":"merchant-terminal"
}                                                     
```
