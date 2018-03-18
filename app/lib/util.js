// Constants
import { UPLOAD_PATH } from './constants';

export function uploads(images) {
  let dataImage = [];

  if (Array.isArray(images)) {
    dataImage = images.map((image, index) => {
      return processImage(image);
    });
  } else {
    dataImage = [
      processImage(images),
    ];
  }
  return dataImage;
}

function saveImagePath(image) {
  return image.mv(`${UPLOAD_PATH}${image.name}`, function(err) {
    if (err) return false;
    return true;
  });
}

function processImage(image) {
  saveImagePath(image);
  return {
    name: image.name,
    mimetype: image.mimetype,
    path: `images/hotels/${image.name}`,
  };
}
