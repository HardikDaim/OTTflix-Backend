const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const db = require('./config/db');
const resolvers = require('./graphql/resolvers');
const app = express();

require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});


async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  db();
  // Wait for the server to start
  await server.start();

  // Apply middleware after the server has started
  server.applyMiddleware({ app });

  const PORT = process.env.PORT;

  // Set up your server to listen on a specific port
 app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });

}

// Start the server
startServer();
