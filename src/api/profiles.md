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

{% h4 Optional Fields %}

| Field            | Type    | Description                                                        |
| :--------------- | :------ | :---------------------------------------------------------------   |
| givenName        | String  | First name.                                                        |
| familyName       | String  | Last name.                                                         |
| featureUpdates   | Boolean | Whether a user would like to receive emails for feature updates.   |
| marketingUpdates | Boolean | Whether a user would like to receive emails for marketing updates. |
| email            | String  | Email address.                                                     |


## Operations

<a name="updating-a-user-profile">
### Updating a user profile **EXPERIMENTAL**

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
