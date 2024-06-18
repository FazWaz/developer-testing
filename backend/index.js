const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Ensure the Apollo server is started before applying middleware
  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
