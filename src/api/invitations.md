---
layout: default
parent: API Reference
title: Invitations
---

# Invitations
An Invitation can be used to allow users to claim ownership of a resource on the Centrapay platform.

{:.no_toc}

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Invitation

{% h4 Mandatory Fields %}

|    Field     |        Type        |                               Description                                |
| :----------- | :----------------- | :----------------------------------------------------------------------- |
| id           | String             | The Invitation's unique identifier.                                      |
| code         | String             | The Invitation code.                                                     |
| type         | String             | The type of the related resource. Supported values are `kete-enrolment`. |
| resourceId   | String             | The id of the related resource.                                          |
| resourceType | String             | The type of the related resource. Supported values are `integration`.    |
| expiresAt    | {% dt Timestamp %} | When the Invitation expires.                                             |
| createdAt    | {% dt Timestamp %} | When the Invitation was created.                                         |
| createdBy    | {% dt CRN %}       | The User or API Key that created the Invitation.                         |

[Managed Integrations]: {% link api/integrations/managed-integrations.md %}
