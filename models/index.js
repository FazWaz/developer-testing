const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Property = sequelize.define('Property', {
  name: DataTypes.STRING,
  shortTitle: DataTypes.STRING,
  price: DataTypes.FLOAT,
  bedrooms: DataTypes.INTEGER,
  area: DataTypes.FLOAT,
  description: DataTypes.STRING,
  images: DataTypes.JSON,
  type: DataTypes.STRING,
});

module.exports = { sequelize, Property };
