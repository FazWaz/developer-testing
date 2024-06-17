const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  type: DataTypes.STRING,
  price: DataTypes.INTEGER,
  bedrooms: DataTypes.INTEGER,
  area: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  images: DataTypes.JSON,
});

module.exports = Property;
