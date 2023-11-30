export default {
  method: 'POST',
  path: '/api/media-uploads',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      mimeType: 'image/png',
      fileName: 'image.png'
    },
  },
};
