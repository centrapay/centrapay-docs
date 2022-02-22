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
| File Format | JSON                     |
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

|      Field       |        Type        |                      Description                       |
| :--------------- | :----------------- | :----------------------------------------------------- |
| availableBalance | {% dt BigNumber %} | Current spendable balance of Farmlands Ledger in cents |
| contacts         | Array              | [Contact][] List for the imported Centrapay Account    |

<a name="contact">
### Contact

Exported Farmlands Contact and [Card][] information used for authentication, correspondence and payment.

{% h4 Required Fields %}

|   Field    |  Type  |                            Description                            |
| :--------- | :----- | :---------------------------------------------------------------- |
| externalId | String | Id used for keeping imported Centrapay Contact details up to date |


{% h4 Optional Fields %}

|  Field  |  Type   |                         Description                          |
| :------ | :------ | :----------------------------------------------------------- |
| name    | String  | The full name used to address the individual                 |
| mobile  | String  | Mobile number used for authentication and correspondence     |
| email   | String  | Email address used for authentication and correspondence     |
| primary | Boolean | `true` if the Contact is the owner of the Farmlands Account  |
| cards   | Array   | [Card][] list used for payment for the authenticated subject |

<a name="card">
### Card

Exported Farmlands Contact and [Card][] information used for authentication, correspondence and payment.

{% h4 Required Fields %}

|      Field      |        Type        |                                  Description                                  |
| :-------------- | :----------------- | :---------------------------------------------------------------------------- |
| externalId      | String             | External unique identifier for card                                           |
| status          | String             | Current status of the card, must be either "active", "inactive" or "archived" |
| expiry          | {% dt Timestamp %} | Expiry date of the card                                                       |


{% h4 Optional Fields %}

|      Field      |  Type  |          Description           |
| :-------------- | :----- | :----------------------------- |
| cardNumber      | String | The card number                |
| farmlandsStatus | String | Reason for status              |


<a name="example">
## Example File

{% json %}
[
  {
    externalId: "F&O guid",
    accountNumber: 012345678,
    availableBalance: 1000,
    contacts: [
      {
        externalId: "F&O guid",
        name: "Road Runner",
        mobile: "+6421102598",
        email: "road@runner.net",
        primary: true,
        cards: [
          {
            externalId: "F&O guid",
            cardNumber: "722702456",
            status: "active",
            expiry: "2025-09-01",
          },
          {
            externalId: "F&O guid",
            cardNumber: "722702456",
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
        primary: false,
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
        primary: false,
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
    accountNumber: 012345678,
    availableBalance: 1000,
		contacts: [],
  },
  {
    externalId: "F&O guid",
    accountNumber: 012345678,
    availableBalance: 1000,
  },
  {
    externalId: "F&O guid",
    accountNumber: 012345678,
  },
  {
    externalId: "F&O guid",
    accountNumber: 012345678,
    contacts: [
      {
        externalId: "F&O guid",
        name: "Road Runner",
        mobile: "+6421102598",
        email: "road@runner.net",
        primary: true,
        cards: [
          {
            externalId: "F&O guid",
            cardNumber: "722702456",
            status: "active",
            expiry: "2025-09-01",
          },
          {
            externalId: "F&O guid",
            cardNumber: "722702456",
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
[Centrapay Account]: {% link api/accounts/accounts.md %}
