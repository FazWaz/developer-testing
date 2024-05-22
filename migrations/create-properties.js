'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        type: Sequelize.STRING
      },
      short_title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      bedroom_count: {
        type: Sequelize.INTEGER
      },
      area: {
        type: Sequelize.INTEGER
      },
      short_description: {
        type: Sequelize.TEXT
      },
      images: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Properties');
  }
};
