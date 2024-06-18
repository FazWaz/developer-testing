import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    searchListings(
      type: String
      minPrice: Float
      maxPrice: Float
      bedrooms: Int
      minArea: Float
      maxArea: Float
    ): [Property!]!
  }

  type Property {
    id: String!
    title: String!
    description: String!
    type: String!
    price: Float!
    bedrooms: Int!
    area: Float!
    images: [Image!]!
    createdAt: String!
    updatedAt: String!
  }

  type Image {
    id: String!
    url: String!
  }

  enum PropertyType {
    SALE
    RENT
  }
`;