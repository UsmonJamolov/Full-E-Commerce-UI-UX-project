const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { z } = require("zod");
const s3 = require("../config/s3");
const File = require("../models/file.model");
const {
  allowedMimeTypes,
  MAX_FILE_SIZE,
  buildFileKey,
  getPublicFileUrl,
} = require("../utils/upload");

const uploadUrlSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  fileSize: z.number().positive(),
  folder: z.string().optional(),
});

const saveFileSchema = z.object({
  key: z.string().min(1),
  url: z.string().min(1),
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().positive(),
  folder: z.string().optional(),
});

const deleteFileSchema = z.object({
  id: z.string().min(1),
});

exports.getUploadUrl = async (req, res) => {
  try {
    const parsed = uploadUrlSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const { fileName, fileType, fileSize, folder } = parsed.data;

    if (!allowedMimeTypes.includes(fileType)) {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    if (fileSize > MAX_FILE_SIZE) {
      return res.status(400).json({ error: "File too large" });
    }

    const key = buildFileKey(fileName, folder || "uploads");

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 5,
    });

    const fileUrl = getPublicFileUrl(key);

    return res.status(200).json({
      uploadUrl,
      key,
      fileUrl,
    });
  } catch (error) {
    console.error("GET_UPLOAD_URL_ERROR:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.saveFile = async (req, res) => {
  try {
    const parsed = saveFileSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const file = await File.create({
      key: parsed.data.key,
      url: parsed.data.url,
      fileName: parsed.data.fileName,
      mimeType: parsed.data.mimeType,
      size: parsed.data.size,
      folder: parsed.data.folder || "uploads",
    });

    return res.status(201).json(file);
  } catch (error) {
    console.error("SAVE_FILE_ERROR:", error);
    return res.status(500).json({ error: "Failed to save file" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    return res.status(200).json(files);
  } catch (error) {
    console.error("GET_FILES_ERROR:", error);
    return res.status(500).json({ error: "Failed to fetch files" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const parsed = deleteFileSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const file = await File.findById(parsed.data.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.key,
      })
    );

    await File.findByIdAndDelete(file._id);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("DELETE_FILE_ERROR:", error);
    return res.status(500).json({ error: "Failed to delete file" });
  }
};