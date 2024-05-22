const db = require('../models');
const { Op } = require('sequelize');

const resolvers = {
  Query: {
    properties: async (_, args) => {
      const where = {};
        if (args.type && args.type != 'All') where.type = args.type;
        if (args.priceMin || args.priceMax) {
          where.price = {};
          if (args.priceMin) where.price[Op.gte] = args.priceMin;
          if (args.priceMax) where.price[Op.lte] = args.priceMax;
        }
        if (args.bedroomCount && args.bedroomCount > 0) where.bedroom_count = args.bedroomCount;
        if (args.areaMin || args.areaMax) {
          where.area = {};
          if (args.areaMin) where.area[Op.gte] = args.areaMin;
          if (args.areaMax) where.area[Op.lte] = args.areaMax;
        }
        if (args.keywords) {
          where[Op.or] = [
            {
              project_name: {
                [Op.like]: `%${args.keywords}%`
              }
            },
            {
              short_title: {
                [Op.like]: `%${args.keywords}%`
              }
            }
          ];
        }
      
      const page = args.page || 1;
      const pageSize = args.pageSize || 9;
      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows } = await db.Property.findAndCountAll({
        where,
        offset,
        limit,
        // logging: loggingFunction
      });

      return {
          properties: rows,
          total: count,
        };
    },
    property: async (_, args) => {
      try {
        const property = await db.Property.findByPk(args.id);
        return property;
      } catch (error) {
        console.error('Error fetching property:', error);
        throw new Error('Failed to fetch property');
      }
    }
  },
};

// for logging sql query
const loggingFunction = (sql) => {
  console.log('==========SQL Query===========');
  console.log(sql);
  console.log('==============================');
};

module.exports = resolvers;
