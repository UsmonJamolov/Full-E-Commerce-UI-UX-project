const express = require("express");
const router = express.Router();
const {
  getUploadUrl,
  saveFile,
  getFiles,
  deleteFile,
} = require("../controllers/file.controller");

router.post("/upload-url", getUploadUrl);
router.post("/", saveFile);
router.get("/", getFiles);
router.delete("/", deleteFile);

module.exports = router;