const { sequelize, Property } = require('../models');

const createTables = async () => {
  await sequelize.sync({ force: true });
  console.log('Tables created');
  process.exit();
};

createTables();
