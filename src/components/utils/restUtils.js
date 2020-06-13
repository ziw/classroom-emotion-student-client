
const BASE_URL = process.env.NODE_ENV === 'development' ?
                  'http://localhost:8080'
                  : 'https://smart-classroom-server.wl.r.appspot.com';
/**
 * Upload a recording snapshot image
 * @param {string} dataUrl the image dataUrl to send
 */
export function uploadSnapshot(dataUrl) {
  const body = new FormData();
  body.append('imageData', dataUrl);

  fetch(`${BASE_URL}/image/upload`, {
    method: 'POST',
    body,
  });
}
