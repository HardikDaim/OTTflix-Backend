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
        return await Video.find().sort({createdAt: -1});
      } catch (err) {
        console.error("Error fetching  movies:", err);
        throw new Error("Failed to fetch movies");
      }
    },
    // Fetch movies by genre
    getMoviesByGenre: async (_, { genre }) => {
      try {
        return await Video.find({ genres: { $in: [genre] } });
      } catch (err) {
        console.error("Error fetching movies by genre:", err);
        throw new Error("Failed to fetch movies by genre");
      }
    },

    // Fetch movies by language
    getMoviesByLanguage: async (_, { language }) => {
      try {
        return await Video.find({ language: { $in: [language] } });
      } catch (err) {
        console.error("Error fetching movies by language:", err);
        throw new Error("Failed to fetch movies by language");
      }
    },

    // Fetch movies by director
    getMoviesByDirector: async (_, { director }) => {
      try {
        return await Video.find({ director });
      } catch (err) {
        console.error("Error fetching movies by director:", err);
        throw new Error("Failed to fetch movies by director");
      }
    },

    // Fetch movies by release year
    getMoviesByReleaseYear: async (_, { year }) => {
      try {
        return await Video.find({ releaseDate: { $regex: year } });
      } catch (err) {
        console.error("Error fetching movies by release year:", err);
        throw new Error("Failed to fetch movies by release year");
      }
    },

    // Fetch movies by duration range
    getMoviesByDuration: async (_, { minDuration, maxDuration }) => {
      try {
        return await Video.find({
          duration: { $gte: minDuration, $lte: maxDuration },
        });
      } catch (err) {
        console.error("Error fetching movies by duration:", err);
        throw new Error("Failed to fetch movies by duration");
      }
    },

    // Fetch movies by rating
    getMoviesByRating: async (_, { rating }) => {
      try {
        return await Video.find({ rating });
      } catch (err) {
        console.error("Error fetching movies by rating:", err);
        throw new Error("Failed to fetch movies by rating");
      }
    },

    // Fetch movies by award
    getMoviesByAward: async (_, { award }) => {
      try {
        return await Video.find({ awards: { $in: [award] } });
      } catch (err) {
        console.error("Error fetching movies by award:", err);
        throw new Error("Failed to fetch movies by award");
      }
    },

    // Fetch movies by tag
    getMoviesByTag: async (_, { tag }) => {
      try {
        return await Video.find({ tags: { $in: [tag] } });
      } catch (err) {
        console.error("Error fetching movies by tag:", err);
        throw new Error("Failed to fetch movies by tag");
      }
    },

    // Fetch recently added movies
    getRecentlyAddedMovies: async (_, { limit }) => {
      try {
        return await Video.find().sort({ dateAdded: -1 }).limit(limit);
      } catch (err) {
        console.error("Error fetching recently added movies:", err);
        throw new Error("Failed to fetch recently added movies");
      }
    },

    // Search movies by query (title, genre, etc.)
    searchMovies: async (_, { query }) => {
      try {
        return await Video.find({
          $or: [
            { title: { $regex: query, $options: "i" } },
            { genres: { $in: [query] } },
            { director: { $regex: query, $options: "i" } },
            { tags: { $in: [query] } },
          ],
        });
      } catch (err) {
        console.error("Error searching movies:", err);
        throw new Error("Failed to search movies");
      }
    },

    // Fetch a specific movie by ID
    getMovieById: async (_, { id }) => {
      try {
        return await Video.findById(id);
      } catch (err) {
        console.error("Error fetching movie by ID:", err);
        throw new Error("Failed to fetch movie");
      }
    },
  },
};

module.exports = resolvers;
