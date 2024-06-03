'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Property.init({
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    area: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    images: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};