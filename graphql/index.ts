import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient, ListingType } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `
  type Property {
    id: Int!
    listingType: ListingType!
    projectName: String!
    title: String!
    price: Int!
    bedrooms: Int!
    area: Int!
    description: String!
    mainImageUrl: String!
    gallery: [Gallery!]!
  }

  type Gallery {
    id: Int!
    imageUrl: String!
    propertyId: Int!
  }

  enum ListingType {
    SALE
    RENT
  }

  type Query {
    properties(
      listingType: ListingType, 
      minPrice: Int, 
      maxPrice: Int, 
      bedrooms: Int, 
      minArea: Int, 
      maxArea: Int
    ): [Property!]!
  }
`;

const resolvers = {
  Query: {
    properties: async (_parent: unknown, args: any) => {
      const { listingType, minPrice, maxPrice, bedrooms, minArea, maxArea } = args;
      const filters: any = {};
      if (listingType) filters.listingType = listingType;
      if (minPrice) filters.price = { gte: minPrice };
      if (maxPrice) filters.price = { lte: maxPrice };
      if (bedrooms) filters.bedrooms = bedrooms;
      if (minArea) filters.area = { gte: minArea };
      if (maxArea) filters.area = { lte: maxArea };

      return prisma.property.findMany({
        where: filters,
        include: {
          gallery: true, 
        },
      });
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const startServer = async () => {
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
