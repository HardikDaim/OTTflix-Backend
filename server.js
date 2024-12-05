const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./graphql/schemas/videoSchema");
const db = require("./config/db");
const resolvers = require("./graphql/resolvers/videoResolver");

require("dotenv").config({});
const app = express();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
  });

  db(); // Connect to MongoDB

  // Wait for the server to start
  await server.start();

  const corsOptions = {
    origin: function (origin, callback) {
      console.log("Origin received:", origin);

      if (process.env.NODE_ENV === "production") {
        // Allow all origins in production
        callback(null, true);
      } else {
        // Restrict origins in development
        const allowedOrigins = [process.env.LOCAL_URL];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow request
        } else {
          console.log(`Blocked by CORS: ${origin}`); // Log the blocked origin
          callback(new Error("Not allowed by CORS")); // Reject request
        }
      }
    },
  };


  // Middleware
  app.use(cors(corsOptions));
  // Apply middleware after the server has started
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.get("/", (req, res) => {
    res.json({ message: "Server is Running" });
  });

  app.use("/api/videos", require("./routes/videoRoutes"));
  app.use("/api/users", require("./routes/userRoutes"));

  // Set up the server to listen on a specific port
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

// Start the server
startServer();
