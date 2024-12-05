const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    synopsis: { type: String }, // Optional detailed description
    genres: [{ type: String, required: true }],
    trailerUrl: { type: String, required: true }, // URL to the video file
    thumbnail: { type: String, required: true }, // URL to the thumbnail image
    country: { type: String }, // Movie production country
    language: [{ type: String }],
    awards: [{ type: String }], // Array of awards won by the movie
    productionCompanies: [{ type: String }],
    tags: [{ type: String }],
    dateAdded: { type: String, required: true },
    featured: { type: Boolean, default: false }, // Mark as featured
    continueWatching: { type: Boolean, default: false }, // Mark as continue watching
    releaseDate: { type: String, required: true }, // Movie release date
    director: { type: String, required: true }, // Movie director
    mainCast: [{ type: String, required: true }], // Array of main cast names
    duration: { type: Number, required: true }, // Duration of the movie in minutes
    rating: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
