---
layout: default
parent: API Reference
title: Media Uploads
permalink: /api/media-upload
---

# Media Uploads
{:.no_toc}

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Media Upload

{% h4 Mandatory Fields %}

|   Field    |        Type        |                                       Description                                       |
| :--------- | :----------------- | :-------------------------------------------------------------------------------------- |
| id         | String             | The Media Upload's unique identifier.                                                   |
| accountId  | String             | The Media Upload's owning Centrapay Account id.                                         |
| mimeType   | String             | The media (MIME) type of the upload.                                                    |
| fileName   | String             | The file name of the upload.                                                            |
| createdAt  | {% dt Timestamp %} | When the Media Upload was created.                                                      |
| updatedAt  | {% dt Timestamp %} | When the Media Upload was updated.                                                      |
| createdBy  | {% dt CRN %}       | The User or API Key that created the Media Upload.                                      |
| updatedBy  | {% dt CRN %}       | The User or API Key that updated the Media Upload.                                      |

{% h4 Optional Fields %}

|   Field   |  Type  |                                Description                                |
| :-------- | :----- | :------------------------------------------------------------------------ |
| uploadUrl | String | A presigned URL that gives users time-limited permission to upload media. |

## Operations

### Create a presigned URL for Media Upload **EXPERIMENTAL**

{% reqspec %}
  POST '/api/media-upload'
  auth 'api-key'
  example {
    body ({
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      mimeType: 'image/png',
      fileName: 'image.png'
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

|   Field   |  Type  |                   Description                   |
| :-------- | :----- | :---------------------------------------------- |
| accountId | String | The Media Upload's owning Centrapay Account id. |
| mimeType  | String | The media (MIME) type of the upload.            |
| fileName  | String | The file name of the upload.                    |

{% h4 Example response payload %}

{% json %}
id: DKTs3U38hdhfEqwF1JKoT2
uploadUrl: https://media-upload.centrapay.com/image.png?jhbdsfau67ewejshb=487hsdjhbdgs743
{% endjson %}
