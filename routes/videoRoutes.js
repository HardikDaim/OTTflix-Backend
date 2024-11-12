const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const upload = require('../middlewares/upload');

// Route to add a new video
router.post("/upload-video", videoController.upload_video);
// Route to get video by ID
router.get("/get-video/:id", videoController.getVideoById);


module.exports = router;
