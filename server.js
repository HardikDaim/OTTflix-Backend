const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./graphql/schemas/videoSchema");
const db = require("./config/db");
const resolvers = require("./graphql/resolvers/videoResolver");
const videoRoutes = require("./routes/videoRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config({});
const app = express();



async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  db(); // Connect to MongoDB

  // Wait for the server to start
  await server.start();
  app.use(cors());
  // Apply middleware after the server has started
  server.applyMiddleware({ app });

  const PORT = process.env.PORT;

  app.use("/api/videos", require("./routes/videoRoutes"));
  app.use("/api/users", require("./routes/userRoutes"));

  // Set up the server to listen on a specific port
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

// Start the server
startServer();
