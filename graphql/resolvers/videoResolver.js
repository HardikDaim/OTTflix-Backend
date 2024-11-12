const Video = require('../../models/videoModel');

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

    // Fetch continue watching videos (could be based on user progress)
    getContinueWatching: async () => {
      try {
        // Placeholder condition to fetch continue watching videos, this can be extended based on user data
        return await Video.find({ continueWatching: true });
      } catch (err) {
        console.error("Error fetching continue watching movies:", err);
        throw new Error("Failed to fetch continue watching movies");
      }
    },

    // Fetch all movies (or videos)
    getMovies: async () => {
      try {
        return await Video.find();
      } catch (err) {
        console.error("Error fetching  movies:", err);
        throw new Error("Failed to fetch movies");
      }
    },
  },
};

module.exports = resolvers;
