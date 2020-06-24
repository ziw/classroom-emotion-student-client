
export const BASE_URL = process.env.NODE_ENV === 'development' ?
                  'http://localhost:8080'
                  : 'https://smart-classroom-server.wl.r.appspot.com';
/**
 * Upload a recording snapshot image
 * @param {string} dataUrl the image dataUrl to send
 * @param {string} username the current username
 */
export function uploadSnapshot(dataUrl, username) {
  const body = new FormData();
  body.append('imageData', dataUrl);
  body.append('username', username);

  fetch(`${BASE_URL}/image/upload`, {
    method: 'POST',
    body,
  });
}
