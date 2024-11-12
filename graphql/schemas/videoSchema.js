const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define the Video Type
  type Video {
    id: ID!
    title: String!
    description: String
    trailerUrl: String!
    genre: String
    thumbnail: String
    releaseDate: String!
    director: String!
    mainCast: [String!]!
    duration: Int!
    rating: String!
  }

  # Define Queries for different sections
  type Query {
    getFeaturedVideo: [Video]
    getContinueWatching: [Video]
    getMovies: [Video]
  }
`;

module.exports = typeDefs;
