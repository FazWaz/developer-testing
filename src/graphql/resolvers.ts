import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

// export const resolvers = {
//   Query: {
//     listings: async () => {
//       return await prisma.property.findMany();
//     },
//     listing: async (_: any, args: { id: string }) => {
//       return await prisma.property.findUnique({
//         where: { id: args.id },
//       });
//     },
//     searchListings: async (_, { name }) => {
//       return await prisma.property.findMany({
//         where: {
//           title: {
//             contains: name,
//             mode: 'insensitive', // Case-insensitive search
//           },
//         },
//       });
//     },
//   },
// };

export const resolvers = {
  Query: {
    searchListings: async (_, args) => {
      const where: Prisma.PropertyWhereInput = {};

      if (args.type) {
        where.type = args.type.toUpperCase();
      }
      if (args.minPrice !== undefined && args.maxPrice !== undefined) {
        where.price = {
          gte: args.minPrice,
          lte: args.maxPrice,
        };
      }
      if (args.bedrooms !== undefined) {
        where.bedrooms = args.bedrooms;
      }
      if (args.minArea !== undefined && args.maxArea !== undefined) {
        where.area = {
          gte: args.minArea,
          lte: args.maxArea,
        };
      }

      return await prisma.property.findMany({
        where,
        include: {
          images: true,
        },
      });
    },
  },
};
