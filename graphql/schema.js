const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    description: String!
    poster: String!
    rating: Float!
  }

  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
  }
`;

module.exports = typeDefs;
