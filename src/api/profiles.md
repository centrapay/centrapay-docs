---
layout: default
parent: API Reference
title: Profiles
permalink: /api/profiles
redirect_from:
  - /profile
---

# Profile
{:.no_toc}

A profile represents a Centrapay user's attributes.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Models

### Profile

{% h4 Mandatory Fields %}

| Field  |  Type  |      Description       |
| :----- | :----- | :--------------------- |
| userId | String | The Centrapay user id. |

{% h4 Optional Fields %}

| Field            | Type    | Description                                                        |
| :--------------- | :------ | :---------------------------------------------------------------   |
| givenName        | String  | First name.                                                        |
| familyName       | String  | Last name.                                                         |
| featureUpdates   | Boolean | Whether a user would like to receive emails for feature updates.   |
| marketingUpdates | Boolean | Whether a user would like to receive emails for marketing updates. |
| email            | String  | Email address.                                                     |
| emailVerified | Boolean | Flag indicating the verification status of the email address. |
| phoneNumber   | String  | The user's phone number.                                      |
| phoneVerified | Boolean | Flag indicating the verification status of the phone number.  |


## Operations

### Update a Profile **EXPERIMENTAL**

Update a user's mutable attributes. At least one field must be provided in the
request.


{% reqspec %}
  POST '/api/me/profile/update'
  auth 'jwt'
  body ({
    givenName: 'John',
    familyName: 'Doe',
    featureUpdates: false,
    marketingUpdates: true,
    email: 'john.doe@centrapay.com'
  })
{% endreqspec %}


{% h4 Example response payload %}

{% json %}
  givenName: "John"
  familyName: "Doe"
  featureUpdates: false
  marketingUpdates: true
  email: "john.doe@centrapay.com"
{% endjson %}

### Get Profile **EXPERIMENTAL**

{% reqspec %}
  GET '/api/users/{userId}/profile'
  path_param 'userId', 'da75ad90-9a5b-4df0-8374-f48b3a8fbfcc'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
userId: 9f4b3bae-dc30-11ea-ab70-2743d9be3dd5
givenName: John
familyName: Doe
featureUpdates: true
marketingUpdates: true
email: john.doe@centrapay.com
emailVerified: true
phoneNumber: '+64271112222'
phoneVerified: true
{% endjson %}
