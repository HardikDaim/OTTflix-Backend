const Video = require("../models/videoModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config({});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

// Controller to fetch video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video data", error });
  }
};

exports.upload_video = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading files", error: err.message });
    }

    // If no files are uploaded
    if (!req.files.video || !req.files.thumbnail) {
      return res
        .status(400)
        .json({ message: "Video and thumbnail are required" });
    }

    try {
      // If the video is marked as featured, unmark others
      if (req.body.featured === "true") {
        await Video.updateMany(
          { featured: true },
          { $set: { featured: false } }
        );
      }

      // Upload video to Cloudinary
      const videoUploadResult = await cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video",
            folder: "videos",
          },
          (error, videoResult) => {
            if (error)
              return res
                .status(500)
                .json({ message: "Video upload failed", error });

            // Upload thumbnail to Cloudinary
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "image",
                  folder: "thumbnails",
                },
                async (error, thumbnailResult) => {
                  if (error)
                    return res
                      .status(500)
                      .json({ message: "Thumbnail upload failed", error });

                  // Prepare video metadata to save in database
                  const videoData = {
                    title: req.body.title,
                    description: req.body.description,
                    synopsis: req.body.synopsis, // Optional
                    genres: req.body.genres ? req.body.genres.split(",") : [], // Genres as an array
                    trailerUrl: videoResult.secure_url, // Cloudinary video URL
                    thumbnail: thumbnailResult.secure_url, // Cloudinary thumbnail URL
                    country: req.body.country, // Optional country
                    language: req.body.language
                      ? req.body.language.split(",")
                      : [], // Array of languages
                    awards: req.body.awards ? req.body.awards.split(",") : [], // Array of awards
                    productionCompanies: req.body.productionCompanies
                      ? req.body.productionCompanies.split(",")
                      : [], // Optional
                    tags: req.body.tags ? req.body.tags.split(",") : [], // Array of tags
                    dateAdded: new Date().toISOString(), // Current date
                    featured: req.body.featured === "true", // Convert to boolean
                    continueWatching: req.body.continueWatching === "true", // Convert to boolean
                    releaseDate: req.body.releaseDate,
                    director: req.body.director,
                    mainCast: req.body.mainCast
                      ? req.body.mainCast.split(",")
                      : [], // Comma-separated main cast
                    duration: req.body.duration,
                    rating: req.body.rating,
                  };

                  // Save video metadata to the database
                  const video = new Video(videoData);
                  await video.save();
                  res
                    .status(200)
                    .json({ message: "Video uploaded successfully", video });
                }
              )
              .end(req.files.thumbnail[0].buffer);
          }
        )
        .end(req.files.video[0].buffer);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error uploading video", error: error.message });
    }
  });
};
