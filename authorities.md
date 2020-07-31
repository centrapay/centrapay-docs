# Bank Authorities API

A bank authority represents an individual's consent for Centrapay to transfer funds to and from a bank account. In order to move funds between a bank account and a Centrapay wallet, there must be a verified bank authority for the Centrapay account that the wallet belongs to.

## Contents
{:.no_toc}

* TOC
{:toc}

## Creating a bank authority

**POST** `https://service.centrapay.com/api/bank-authorities`

```
curl -X POST "https://service.centrapay.com/api/bank-authorities" \
-H "x-api-key:1234" \
-H "content-type: application/json" \
-d '{
        "fullName":"John Doe",
        "accountId":"Jaim1Cu1Q55uooxSens6yk",
        "streetAddress":"11 Shortland St",
        "suburb":"Auckland Central",
        "city":"Auckland",
        "postCode":"1100",
        "phoneNumber":"+64212345678",
        "emailAddress":"John.doe@email.com",
        "bankAccountNumber":"12-1234-1234567-123",
        "bankAccountName":"John Doe"
    }
```

**Required Fields**

|       Field       |  Type  |                    Description                    |
| ----------------- | ------ | ------------------------------------------------- |
| fullName          | String | The first and last name of the user               |
| streetAddress     | String | The street address of the user                    |
| suburb            | String | The suburb relating to the user's address         |
| city              | String | The city relating to the users address            |
| postCode          | String | The postal code relating to the user's address    |
| phoneNumber       | String | The user's phone number                           |
| emailAddress      | String | The user's email address                          |
| bankAccountNumber | String | The user's bank account number                    |
| bankAccountName   | String | The name on the bank account provided by the user |

**Example response payload**

```
{
    "id":"WRhAxxWpTKb5U7pXyxQjjY",
    "accountId":"Jaim1Cu1Q55uooxSens6yk",
    "fullName":"John Doe",
    "streetAddress":"11 Shortland St",
    "suburb":"Auckland Central",
    "city":"Auckland",
    "postCode":"1100",
    "phoneNumber":"+64212345678",
    "emailAddress":"John.doe@email.com",
    "bankAccountNumber":"12-1234-1234567-123",
    "bankAccountName":"John Doe",
    "createdAt": "2020-06-12T01:17:46.499Z",
    "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
    "modifiedAt": "2020-06-12T01:17:46.499Z",
    "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```
**Error Responses**

| Status |             Code              |                         Description                         |
| ------ | ----------------------------- | ----------------------------------------------------------- |
| 403    | BANK_AUTHORITY_LIMIT_EXCEEDED | The account already has the max amount of bank authorities. |

## Get information about a bank authority  

**GET** `https://service.centrapay.com/api/bank-authorities/{id}`

```
curl -X GET `https://service.centrapay.com/api/bank-authorities/Jaim1Cu1Q55uooxSens6yk` \
-H "x-api-key:1234"
```

**Example response payload**

```
{
    "id":"WRhAxxWpTKb5U7pXyxQjjY",
    "accountId":"Jaim1Cu1Q55uooxSens6yk",
    "fullName":"John Doe",
    "streetAddress":"11 Shortland St",
    "suburb":"Auckland Central",
    "city":"Auckland",
    "postCode":"1100",
    "phoneNumber":"+64212345678",
    "emailAddress":"John.doe@email.com",
    "bankAccountNumber":"12-1234-1234567-123",
    "bankAccountName":"John Doe",
    "createdAt": "2020-06-12T01:17:46.499Z",
    "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
    "modifiedAt": "2020-06-12T01:17:46.499Z",
    "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

## List authorized bank authorities

**GET** `https://service.centrapay.com/api/bank-authorities

```
curl -X GET "https://service.centrapay.com/api/bank-authorities" \
-H "x-api-key:1234"
```

**Example response payload**

```
[{
    "id":"WRhAxxWpTKb5U7pXyxQjjY",
    "accountId":"Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber":"12-1234-1234567-123",
    "bankAccountName":"John Doe",
    "createdAt": "2020-06-12T01:17:46.499Z",
},
{
    "id":"b5URhAxxWpTKyxQjjY7pXW",
    "accountId":"Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber":"12-1234-1234567-123",
    "bankAccountName":"Jane Doe",
    "createdAt": "2020-06-12T01:17:46.499Z",
}]
```
