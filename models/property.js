module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
      project_name: DataTypes.STRING,
      short_title: DataTypes.STRING,
      price: DataTypes.FLOAT,
      bedroom_count: DataTypes.INTEGER,
      area: DataTypes.FLOAT,
      short_description: DataTypes.TEXT,
      images: DataTypes.JSON,
      type: DataTypes.STRING,
    });
    return Property;
  };
