---
layout: default
title: farmlands-external-asset
parent: Batches
grand_parent: Api Reference
has_children: false
nav_exclude: true
permalink: /api/batch-types/farmlands-external-asset
description: |
  Load Farmlands card data
---

# Farmlands External Asset Batch

Loads Farmlands card data into Centrapay as external assets.

| Type Name   | farmlands-external-asset |
| File Format | JSON |
| File Schema | Array of [Account] |


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

<a name="account">
### Account

{% h4 Required Fields %}

|     Field     |                   Description                    |
| :------------ | :----------------------------------------------- |
| externalId    | External unique identifier for Farmlands account |
| accountNumber | Farmlands account number                         |


{% h4 Optional Fields %}

|      Field       |                                 Description                                  |
| :--------------- | :--------------------------------------------------------------------------- |
| availableBalance | Current spendable balance of account in cents                                |
| contacts         | List of [Contact][]                                                 |

<a name="contact">
### Contact

{% h4 Required Fields %}

|   Field    |  Type  |              Description               |
| :--------- | :----- | :------------------------------------- |
| externalId | String | External unique identifier for contact |


{% h4 Optional Fields %}

|   Field   |  Type   |                                        Description                                        |
| :-------- | :------ | ----------------------------------------------------------------------------------------- |
| name      | String  | Name of contact                                                                           |
| mobile    | String  | Mobile number of contact                                                                  |
| email     | String  | Email address of contact                                                                  |
| isPrimary | Boolean | 'true' if the contact is the primary contact of the containing account, 'false' otherwise |
| cards     | List    | List of [Card][]                                                               |

<a name="card">
### Card

{% h4 Required Fields %}

|      Field      |        Type        |                                  Description                                  |
| :-------------- | :----------------- | :---------------------------------------------------------------------------- |
| externalId      | String             | External unique identifier for card                                           |
| status          | String             | Current status of the card, must be either 'active', 'inactive' or 'archived' |
| expiry          | {% dt Timestamp %} | Expiry date of the card                                                       |


{% h4 Optional Fields %}

|      Field      |        Type        |          Description           |
| :-------------- | :----------------- | ------------------------------ |
| cardNumber      | {% dt BigNumber %} | The card number                |
| barcode         | {% dt BigNumber %} | The barcode number of the card |
| farmlandsStatus | String             | Reason for status              |


<a name="example">
## Example File

{% json %}
[
  {
    externalId: "F&O guid",
    accountNumber: "012345678",
    availableBalance: "1000",
    contacts: [
      {
        externalId: "F&O guid",
        name: "Road Runner",
        mobile: "+6421102598",
        email: "road@runner.net",
        isPrimary: "true",
        cards: [
          {
            externalId: "F&O guid",
            cardNumber: "722702456",
            status: "active",
            expiry: "2025-09-01",
          },
          {
            externalId: "F&O guid",
            barcode: "722702456",
            status: "inactive",
            farmlandsStatus: "Suspended by customer",
            expiry: "2025-09-01",
          }
        ]
      },
      {
        externalId: "F&O guid",
        name: "Yosemite Same",
        mobile: "+6420002598",
        email: "yosemite@runner.net",
        isPrimary: "false",
        cards: [
          {
            externalId: "F&O guid",
            cardNumber: "722798756",
            status: "active",
            expiry: "2025-11-01",
          }
        ]
      },
      {
        externalId: "F&O guid",
        name: "Wile E. Coyote",
        mobile: "+6421102598",
        email: "while@e-cyote.net",
        isPrimary: "false",
        cards: [
          {
            externalId: "F&O guid",
            cardNumber: "722798445",
            status: "active",
            expiry: "2026-02-01",
          }
        ]
      }
    ]
  },
  {
    externalId: "F&O guid",
    accountNumber: "012345678",
    availableBalance: "1000",
		contacts: [],
  },
  {
    externalId: "F&O guid",
    accountNumber: "012345678",
    availableBalance: "1000",
  },
  {
    externalId: "F&O guid",
    accountNumber: "012345678",
  },
  {
    externalId: "F&O guid",
    accountNumber: "012345678",
    contacts: [
      {
        externalId: "F&O guid",
        name: "Road Runner",
        mobile: "+6421102598",
        email: "road@runner.net",
        isPrimary: "true",
        cards: [
          {
            externalId: "F&O guid",
            cardNumber: "722702456",
            status: "active",
            expiry: "2025-09-01",
          },
          {
            externalId: "F&O guid",
            barcode: "722702456",
            status: "inactive",
            expiry: "2025-09-01",
          }
        ]
      }
    ]
  }
]
{% endjson %}

[Account]: #account
[Contact]: #contact
[Card]: #card
