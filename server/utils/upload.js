const crypto = require("crypto");

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "");
}

function buildFileKey(fileName, folder = "uploads") {
  const cleanName = sanitizeFileName(fileName);
  return `${folder}/${crypto.randomUUID()}-${cleanName}`;
}

function getPublicFileUrl(key) {
  const endpoint = process.env.S3_ENDPOINT;
  const bucket = process.env.S3_BUCKET_NAME;
  return `${endpoint}/${bucket}/${key}`;
}

module.exports = {
  allowedMimeTypes,
  MAX_FILE_SIZE,
  sanitizeFileName,
  buildFileKey,
  getPublicFileUrl,
};