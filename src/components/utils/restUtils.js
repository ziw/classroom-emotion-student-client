/**
 * Upload a recording snapshot image
 * @param {string} dataUrl the image dataUrl to send
 */
export function uploadSnapshot(dataUrl) {
  const body = new FormData();
  body.append('imageData', dataUrl);

  //TODO configure base url
  fetch('http://localhost:8000/image/upload', {
    method: 'POST',
    body,
  });
}
