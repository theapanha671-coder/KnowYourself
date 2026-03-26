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
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  configured = true;
}

function hasCloudinary() {
  return configured;
}

function isCloudinaryUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (!/cloudinary\.com$/i.test(parsed.hostname)) return false;
    return parsed.pathname.includes("/upload/");
  } catch {
    return false;
  }
}

function getPublicIdFromUrl(url) {
  if (!isCloudinaryUrl(url)) return null;
  try {
    const parsed = new URL(url);
    const idx = parsed.pathname.indexOf("/upload/");
    if (idx === -1) return null;
    const after = parsed.pathname.slice(idx + "/upload/".length);
    const parts = after.split("/").filter(Boolean);
    if (!parts.length) return null;

    // If there is a version segment like v123, public_id is everything after it.
    let start = 0;
    for (let i = 0; i < parts.length; i += 1) {
      if (/^v\d+$/.test(parts[i])) {
        start = i + 1;
        break;
      }
    }
    const publicParts = parts.slice(start);
    if (!publicParts.length) return null;

    // Remove file extension from last segment.
    const last = publicParts[publicParts.length - 1];
    const dot = last.lastIndexOf(".");
    if (dot !== -1) publicParts[publicParts.length - 1] = last.slice(0, dot);
    return publicParts.join("/");
  } catch {
    return null;
  }
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

async function deleteByUrl(url) {
  if (!hasCloudinary()) return false;
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) return false;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    return true;
  } catch {
    return false;
  }
}

module.exports = { hasCloudinary, uploadBuffer, deleteByUrl, isCloudinaryUrl, getPublicIdFromUrl };
