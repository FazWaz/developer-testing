const { gql } = require('apollo-server-micro');

const typeDefs = gql`
  type Property {
    id: ID!
    project_name: String!
    short_title: String!
    price: Float!
    bedroom_count: Int!
    area: Float!
    short_description: String!
    images: String
    type: String!
  }

  type PaginatedProperties {
    properties: [Property]!
    total: Int!
  }

  type Query {
    properties(
      keywords: String
      type: String
      priceMin: Float
      priceMax: Float
      bedroomCount: Int
      areaMin: Float
      areaMax: Float
      page: Int
      pageSize: Int
    ): PaginatedProperties

    property(id: ID!): Property
  }
`;

module.exports = typeDefs;
