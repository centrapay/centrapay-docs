---
layout: default
title: Farmlands External Asset Batch
parent: Batches
grand_parent: Api Reference
has_children: false
nav_exclude: true
type: farmlands-external-asset
permalink: /api/batch-types/farmlands-external-asset
redirect_from:
  - /api/batch-types/farmlands
---

# Farmlands External Asset Batch

Loads Farmlands Card data into Centrapay as external assets.

| Type Name   | farmlands-external-asset |
| File Format | [JSONL][]{:.external}    |
| File Schema | Array of [Account]       |

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

<a name="account">
### Account

Exported Farmlands Account used for importing and updating of a [Centrapay Account][]

{% h4 Required Fields %}

|     Field     |        Type        |                        Description                        |
| :------------ | :----------------- | :-------------------------------------------------------- |
| externalId    | String             | Id used for keeping imported Centrapay Account up to date |
| accountNumber | {% dt BigNumber %} | Farmlands identifier attached to the Centrapay Account    |


{% h4 Optional Fields %}

|      Field       |        Type        |                                         Description                                       |
| :--------------- | :----------------- | :---------------------------------------------------------------------------------------- |
| availableBalance | {% dt BigNumber %} | Current spendable balance of Farmlands Ledger in cents                                    |
| contacts         | Array              | [Contact][] List for the imported Centrapay Account. When empty all Contacts are removed. |

<a name="contact">
### Contact

Exported Farmlands Contact and [Card][] information used for authentication, correspondence and payment.

{% h4 Required Fields %}

|   Field    |  Type  |                            Description                            |
| :--------- | :----- | :---------------------------------------------------------------- |
| externalId | String | Id used for keeping imported Centrapay Contact details up to date |


{% h4 Optional Fields %}

|  Field  |         Type         |                                            Description                                         |
| :------ | :------------------- | :--------------------------------------------------------------------------------------------- |
| name    | String               | The full name used to address the individual                                                   |
| mobile  | {% dt PhoneNumber %} | Mobile number used for authentication and correspondence, must start with +64                  |
| email   | String               | Email address used for authentication and correspondence                                       |
| primary | Boolean              | `true` if the Contact is the owner of the Farmlands Account                                    |
| cards   | Array                | [Card][] list used for payment for the authenticated subject. When empty all Cards are removed |

<a name="card">
### Card

Exported Farmlands Credit Card information used for importing and updating of a [Patron Code][]

{% h4 Required Fields %}

|   Field    |        Type        |                                                      Description                                                      |
| :--------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------- |
| externalId | String             | Id used for keeping imported [Patron Code][] details up to date                                                       |
| status     | String             | Current state of the Card. Valid values are "active", "inactive" and "archived"                                       |
| expiry     | {% dt Timestamp %} | Payments will be accepted until this time. When expressed as `YYYY-MM-DD` the Card will be valid up to 23:59:59 NZST. |

{% h4 Optional Fields %}

|      Field      |  Type  |                              Description                              |
| :-------------- | :----- | :-------------------------------------------------------------------- |
| barcode         | String | 9 digit field to display in barcode format                            |
| farmlandsStatus | String | Private field used in all Farmlands payment transaction notifications |

<a name="jsonl-example">
## Example JSONL File

A complete batch example with all batch types included. For more legible
examples please refer to [Example Models][].

```json
{"externalId":"9b2ec6d1-c83b-496a-8e52-2989f23d9076","accountNumber":"012345678","availableBalance":"1000","contacts":[]}
{"externalId":"d0d7e14d-4ce5-4f42-8a4c-d604a9609f66","accountNumber":"012345678","availableBalance":"1000"}
{"externalId":"69d64d80-f9bd-4057-bc5b-1c55685d995b","accountNumber":"012345678","contacts":[{"externalId":"6e496c2a-1dae-4036-847d-c53bf6c6d410","name":"Road Runner","mobile":"+64221105598","email":"road@runner.net","primary":true,"cards":[{"externalId":"9b2ec6d1-c83b-496a-8e52-2989f23d9076","barcode":"976238759","status":"active","expiry":"2022-10-01T22:32:56.631Z"},{"externalId":"74e4f94c-8316-42e7-9aa1-eb1539528894","barcode":"957813964","status":"inactive","expiry":"2022-08-01T22:32:56.631Z"}]}]}
{"externalId":"b5fde0e0-357c-4fda-a90f-fd857f2be999","accountNumber":"830578479","availableBalance":"12000","contacts":[{"externalId":"6e496c2a-1dae-4036-847d-c53bf6c6d410","name":"Road Runner","mobile":"+64221102598","email":"road@runner.net","primary":true,"cards":[{"externalId":"65e701c3-6973-4322-8fa6-4560a489417f","barcode":"458028560","status":"active","expiry":"2023-06-01T22:32:56.631Z"},{"externalId":"69d64d80-f9bd-4057-bc5b-1c55685d995b","barcode":"635570865","status":"inactive","farmlandsStatus":"Suspended by customer","expiry":"2022-04-01T22:32:56.631Z"}]},{"externalId":"6e4813e6-7a18-47ea-b92e-add36c8815ca","name":"Yosemite Sam","mobile":"+64220002598","email":"yosemite@runner.net","primary":false,"cards":[{"externalId":"74e4f94c-8316-42e7-9aa1-eb1539528894","barcode":"137628567","status":"active","expiry":"2025-06-01"}]},{"externalId":"82bdb041-ea79-448c-816f-77af8b6750b2","name":"Wile E. Coyote","mobile":"+64221102598","email":"while@e-cyote.net","primary":false,"cards":[{"externalId":"62904b86-b4cc-45a9-b3c9-287a00ae9ef5","barcode":"722798445","status":"active","expiry":"2025-05-07"}]}]}
```

<a name="example">
## Example Models

Centrapay matches perviously created resources using `externalId` and records
get created or updated based on these IDs. In some cases, fields may be omitted
to only update some fields.

{% warning 
  Below our records have newlines for legibility.
  When submitting a batch file you must only use newlines to separate records.
%} 

An example of a Farmlands Asset complete with availableBalance, contacts and cards.

{% json %}
{
  "externalId": "b5fde0e0-357c-4fda-a90f-fd857f2be999",
  "accountNumber": "830578479",
  "availableBalance": "12000",
  "contacts": [
    {
      "externalId": "6e496c2a-1dae-4036-847d-c53bf6c6d410",
      "name": "Road Runner",
      "mobile": "+64221102598",
      "email": "road@runner.net",
      "primary": true,
      "cards": [
        {
          "externalId": "65e701c3-6973-4322-8fa6-4560a489417f",
          "barcode": "458028560",
          "status": "active",
          "expiry": "2023-06-01T22:32:56.631Z"
        },
        {
          "externalId": "69d64d80-f9bd-4057-bc5b-1c55685d995b",
          "barcode": "635570865",
          "status": "inactive",
          "farmlandsStatus": "Suspended by customer",
          "expiry": "2022-04-01T22:32:56.631Z"
        }
      ]
    },
    {
      "externalId": "6e4813e6-7a18-47ea-b92e-add36c8815ca",
      "name": "Yosemite Sam",
      "mobile": "+64220002598",
      "email": "yosemite@runner.net",
      "primary": false,
      "cards": [
        {
          "externalId": "74e4f94c-8316-42e7-9aa1-eb1539528894",
          "barcode": "137628567",
          "status": "active",
          "expiry": "2025-06-01"
        }
      ]
    },
    {
      "externalId": "82bdb041-ea79-448c-816f-77af8b6750b2",
      "name": "Wile E. Coyote",
      "mobile": "+64221102598",
      "email": "while@e-cyote.net",
      "primary": false,
      "cards": [
        {
          "externalId": "62904b86-b4cc-45a9-b3c9-287a00ae9ef5",
          "barcode": "722798445",
          "status": "active",
          "expiry": "2025-05-07"
        }
      ]
    }
  ]
}
{% endjson %}

Update the availableBalance on an account and remove all contacts associated
with it. Note, this renders the availableBalance un-spendable.

{% json %}
{
  "externalId": "9b2ec6d1-c83b-496a-8e52-2989f23d9076",
  "accountNumber": "012345678",
  "availableBalance": "1000",
  "contacts": []
}
{% endjson %}

Update the availableBalance on an account.

{% json %}
{
  "externalId": "d0d7e14d-4ce5-4f42-8a4c-d604a9609f66",
  "accountNumber": "012345678",
  "availableBalance": "1000"
}
{% endjson %}

Update the contact list for an account. Use this where you want to exclude availableBalance.
{% json %}
{
  "externalId": "69d64d80-f9bd-4057-bc5b-1c55685d995b",
  "accountNumber": "012345678",
  "contacts": [
    {
      "externalId": "6e496c2a-1dae-4036-847d-c53bf6c6d410",
      "name": "Road Runner",
      "mobile": "+64221105598",
      "email": "road@runner.net",
      "primary": true,
      "cards": [
        {
          "externalId": "9b2ec6d1-c83b-496a-8e52-2989f23d9076",
          "barcode": "976238759",
          "status": "active",
          "expiry": "2022-10-01T22:32:56.631Z"
        },
        {
          "externalId": "74e4f94c-8316-42e7-9aa1-eb1539528894",
          "barcode": "957813964",
          "status": "inactive",
          "expiry": "2022-08-01T22:32:56.631Z"
        }
      ]
    }
  ]
}
{% endjson %}

[Account]: #account
[Contact]: #contact
[Card]: #card
[Centrapay Account]: {% link api/accounts/accounts.md %}
[Patron Code]: {% link api/patron-codes.md %}
[JSONL]: https://jsonlines.org/
[Example Models]: #example