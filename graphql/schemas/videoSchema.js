const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define the Video Type with additional fields
  type Video {
    id: ID!
    title: String!
    description: String!
    synopsis: String  # Optional detailed description
    genres: [String!]!  # Array of genres
    trailerUrl: String!
    thumbnail: String!
    country: String  # Movie production country
    language: [String!]  # Array of languages
    awards: [String!]  # Array of awards won by the movie
    productionCompanies: [String!]  # Array of production companies
    tags: [String!]  # Tags for categorizing the movie
    dateAdded: String!  # Date when the movie was added to the database
    featured: Boolean!  # Mark as featured
    continueWatching: Boolean!  # Mark as continue watching
    releaseDate: String!
    director: String!
    mainCast: [String!]!
    duration: Int!
    rating: String!
  }

  # Define Queries for different sections
  type Query {
    getFeaturedVideo: [Video]  # Fetch all featured videos
    getMovies: [Video]  # Fetch all movies
    searchMovies(query: String!): [Video]  # Fetch movies based on a search query (title, genre, etc.)
    recommendedMovies: [Video]
  }
`;

module.exports = typeDefs;
