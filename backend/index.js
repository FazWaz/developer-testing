const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

const Property = sequelize.define('Property', {
  type: DataTypes.STRING,
  price: DataTypes.INTEGER,
  bedrooms: DataTypes.INTEGER,
  area: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  images: DataTypes.JSON,
});

const typeDefs = gql`
  type Property {
    id: ID!
    type: String!
    price: Int!
    bedrooms: Int!
    area: Int!
    title: String!
    description: String!
    images: [String]!
  }

  type PropertiesResult {
    properties: [Property]
    totalCount: Int
  }

  type Query {
    properties(type: String, minPrice: Int, maxPrice: Int, bedrooms: Int, minArea: Int, maxArea: Int, limit: Int, offset: Int): PropertiesResult
  }
`;

const resolvers = {
  Query: {
    properties: async (parent, args) => {
      const where = {};
      if (args.type) where.type = args.type;
      if (args.minPrice || args.maxPrice) where.price = { [Sequelize.Op.between]: [args.minPrice || 0, args.maxPrice || 10000000] };
      if (args.bedrooms) where.bedrooms = args.bedrooms;
      if (args.minArea || args.maxArea) where.area = { [Sequelize.Op.between]: [args.minArea || 0, args.maxArea || 100000] };

      const { count, rows } = await Property.findAndCountAll({ where, limit: args.limit, offset: args.offset });
      
      return { properties: rows, totalCount: count };
    },
  },
};


async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();  // Ensure the Apollo server is started before applying middleware
  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
