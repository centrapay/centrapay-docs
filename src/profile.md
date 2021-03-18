---
layout: default
title: Profile
nav_order: 6
---

# Profile
{:.no_toc}

A profile represents a Centrapay user's attributes.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Updating a user's profile **EXPERIMENTAL**

{% endpoint POST https://service.centrapay.com/api/me/profile/update %}

```sh
curl -X POST "https://service.centrapay.com/api/me/profile/update" \
  -H "authorization: $jwt" \
  -H "content-type: application/json" \
  -d '{
    "givenName": "John",
    "familyName": "Doe",
    "featureUpdates": false,
    "marketingUpdates": true,
    "email": "john.doe@centrapay.com"
  }'
```

**Optional Fields** (Note at least one field must be provided in the request)

|      Field       |  Type   |                 Description                                                                        |
| :--------------- | :------ | :------------------------------------------------------------------------------------------------- |
| givenName        | String  | First name                                                                                         |
| familyName       | String  | Last name                                                                                          |
| featureUpdates   | Boolean | Whether a user would like to receive emails for feature updates                                    |
| marketingUpdates | Boolean | Whether a user would like to receive emails for marketing updates                                  |
| email            | String  | Email address                                                                                      |

**Example response payload**

```json
{
  "givenName": "John",
  "familyName": "Doe",
  "featureUpdates": false,
  "marketingUpdates": true,
  "email": "john.doe@centrapay.com",
}
```