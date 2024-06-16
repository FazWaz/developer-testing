// // pages/api/graphql.ts

// import { ApolloServer } from '@apollo/server';
// import { gql } from '@apollo/client';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { startServerAndCreateNextHandler } from '@as-integrations/next';
// import prisma from '@/lib/prisma';

// const typeDefs = gql`
//   type Query {
//     listings: [Property!]!
//     listing(id: String!): Property
//   }

//   type Property {
//     id: String!
//     title: String!
//     description: String!
//     type: PropertyType!
//     price: Float!
//     bedrooms: Int!
//     area: Float!
//     createdAt: String!
//     updatedAt: String!
//   }

//   enum PropertyType {
//     SALE
//     RENT
//   }
// `;

// const resolvers = {
//   Query: {
//     listings: async () => {
//       return await prisma.property.findMany();
//     },
//     listing: async (_parent, { id }) => {
//       return await prisma.property.findUnique({
//         where: { id },
//       });
//     },
//   },
// };

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // export default apolloServer.createHandler({ path: '/api/graphql' });

// // export default startServerAndCreateNextHandler(apolloServer, {
// //   context: async (req, res) => ({ req, res, prisma }),
// // });

// const handler = apolloServer.createHandler({ path: '/api/graphql' });

// export default function (req: NextApiRequest, res: NextApiResponse) {
//   return handler(req, res);
// }


// pages/api/graphql.ts

// import { ApolloServer } from '@apollo/server';
// import { startServerAndCreateNextHandler } from '@as-integrations/next';
// import { gql } from 'graphql-tag';
// import prisma from '@/lib/prisma';

// const typeDefs = gql`
//   type Query {
//     listings: [Property!]!
//     listing(id: String!): Property
//   }

//   type Property {
//     id: String!
//     title: String!
//     description: String!
//     type: PropertyType!
//     price: Float!
//     bedrooms: Int!
//     area: Float!
//     createdAt: String!
//     updatedAt: String!
//   }

//   enum PropertyType {
//     SALE
//     RENT
//   }
// `;

// const resolvers = {
//   Query: {
//     listings: async () => {
//       return await prisma.property.findMany();
//     },
//     listing: async (_parent, { id }) => {
//       return await prisma.property.findUnique({
//         where: { id },
//       });
//     },
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// export default startServerAndCreateNextHandler(server);

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);