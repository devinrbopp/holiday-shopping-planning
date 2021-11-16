'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('occasions', [
      {
        name: 'Christmas',
        date: '1900-12-25',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Valentine\'s Day',
        date: '1900-2-14',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lunar New Year',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Easter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hanukkah',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], { returning: true })
  },

  down: function (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('occasions', null, {});
  }
};
