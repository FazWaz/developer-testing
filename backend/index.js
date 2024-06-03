const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 4000;

const sequelize = new Sequelize('real_estate', 'user', 'password', {
  host: 'mysql',
  dialect: 'mysql',
});

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

  type Query {
    properties(type: String, minPrice: Int, maxPrice: Int, bedrooms: Int, minArea: Int, maxArea: Int): [Property]
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
      return await Property.findAll({ where });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});