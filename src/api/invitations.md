---
layout: default
parent: API Reference
title: Invitations
---

# Invitations
An Invitation can be used to invite a user to the Centrapay platform.

{:.no_toc}

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Invitation

{% h4 Mandatory Fields %}

|   Field   |        Type        |                   Description                    |
| :-------- | :----------------- | :----------------------------------------------- |
| id        | String             | The Invitation's unique identifier.              |
| url       | String             | The Invitation URL.                              |
| expiresAt | {% dt Timestamp %} | When the Invitation expires.                     |
| createdAt | {% dt Timestamp %} | When the Invitation was created.                 |
| createdBy | {% dt CRN %}       | The User or API Key that created the Invitation. |
