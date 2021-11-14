'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      etsyListingId: {
        type: Sequelize.STRING
      },
      isPurchased: {
        type: Sequelize.BOOLEAN
      },
      store: {
        type: Sequelize.STRING
      },
      recipientId: {
        type: Sequelize.INTEGER
      },
      occasionId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('gifts');
  }
};