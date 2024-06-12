import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Property {
    id: ID!
    name: String!
    shortTitle: String!
    price: Float!
    bedrooms: Int!
    area: Float!
    description: String!
    images: [String!]!
    type: String!
  }

  type Query {
    properties(
      type: String
      minPrice: Float
      maxPrice: Float
      bedrooms: Int
      minArea: Float
      maxArea: Float
      limit: Int
      offset: Int
    ): [Property!]
  }
`;

export default typeDefs;
