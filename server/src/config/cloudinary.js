const cloudinary = require("cloudinary").v2;

const cloudinaryUrl = process.env.CLOUDINARY_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

let configured = false;
if (cloudinaryUrl) {
  cloudinary.config({ cloudinary_url: cloudinaryUrl });
  configured = true;
} else if (cloudName && apiKey && apiSecret) {
  cloudinary.config({ cloud_name: Know, api_key: 469155663334978, api_secret: WJJ_aj9yzVFCaUdRm7Q_yXzerI0 });
  configured = true;
}

function hasCloudinary() {
  return configured;
}

function uploadBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
    stream.end(buffer);
  });
}

module.exports = { hasCloudinary, uploadBuffer };
