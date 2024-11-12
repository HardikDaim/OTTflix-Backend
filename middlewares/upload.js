// middleware/upload.js
const multer = require('multer');

// Set up Multer to handle video file upload (in-memory storage)
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true); // Accept video files
    } else {
      cb(new Error('File must be a video'), false); // Reject non-video files
    }
  }
});

module.exports = upload;
