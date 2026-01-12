const transcriptLogic = require("../BL/transcriptLogic");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {validateExtension} = require("../middleware/validateExtension");

router.post(
  "/transcribe",
  upload.single("myFile"),
  validateExtension,
  async (req, res) => {
    try {
      const file = await transcriptLogic.transcribeFile(
        req.file.buffer,
        req.file.originalname
      );
      res.status(file.code).send(file.message);
    } catch (err) {
      res.status(err.code).send(err.message);
    }
  }
);
module.exports = router;
