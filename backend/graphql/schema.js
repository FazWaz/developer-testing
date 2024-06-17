const { gql } = require('apollo-server-express');

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

module.exports = typeDefs;
