const Video = require("../../models/videoModel");

const resolvers = {
  Query: {
    // Fetch featured videos
    getFeaturedVideo: async () => {
      try {
        // Assuming we mark featured videos in the database with a "featured" field
        return await Video.find({ featured: true });
      } catch (err) {
        console.error("Error fetching featured movies:", err);
        throw new Error("Failed to fetch featured movies");
      }
    },

    // Fetch all movies (or videos)
    getMovies: async () => {
      try {
        return await Video.find().sort({ createdAt: -1 });
      } catch (err) {
        console.error("Error fetching  movies:", err);
        throw new Error("Failed to fetch movies");
      }
    },

    // Searching Movie
    searchMovies: async (_, { query }) => {
      const regex = new RegExp(query, "i"); // Case-insensitive search
      return await Video.find({
        $or: [{ title: regex }, { genres: regex }, { tags: regex }],
      });
    },

     // Fetch recommended movies - top 5 recently added movies
     recommendedMovies: async () => {
      try {
        // Fetch the top 5 recently added movies
        return await Video.find().sort({ createdAt: -1 }).limit(15);
      } catch (err) {
        console.error("Error fetching recommended movies:", err);
        throw new Error("Failed to fetch recommended movies");
      }
    },
  },
};

module.exports = resolvers;
