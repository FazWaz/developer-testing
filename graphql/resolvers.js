import { Property } from '../models';
import { Op } from 'sequelize';

const resolvers = {
  Query: {
    properties: async (_, args) => {
      const where = {};
      if (args.type) where.type = args.type;
      if (args.minPrice) where.price = { ...where.price, [Op.gte]: args.minPrice };
      if (args.maxPrice) where.price = { ...where.price, [Op.lte]: args.maxPrice };
      if (args.bedrooms) where.bedrooms = args.bedrooms;
      if (args.minArea) where.area = { ...where.area, [Op.gte]: args.minArea };
      if (args.maxArea) where.area = { ...where.area, [Op.lte]: args.maxArea };
      
      const limit = args.limit || 10; 
      const offset = args.offset || 0; 

      return await Property.findAll({ where, limit, offset });
    },
  },
};

export default resolvers;
