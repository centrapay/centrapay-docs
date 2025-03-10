export default {
  method: 'POST',
  path: '/api/media-uploads',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'multipart/form-data',
    },
    postData: {
      mimeType: 'multipart/form-data',
      params: [
        {
          name: 'purpose',
          value: 'branding-logo'
        },
        {
          name: 'file',
          fileName: '/path/to/a/file.png',
          contentType: 'image/png'
        }
      ]
    }
  },
  response: {
    id: 'DKTs3U38hdhfEqwF1JKoT2',
  }
};
