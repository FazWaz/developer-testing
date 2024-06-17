const { Sequelize } = require('sequelize');
// const Property = require('../models/Property');
const Property = require('../models/property');

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

module.exports = resolvers;
