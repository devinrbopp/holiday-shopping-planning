'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('occasions', [
      {
        name: 'Christmas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true })
  },

  down: function (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('occasions', null, {});
  }
};
