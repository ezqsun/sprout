'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserPlants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trefleReferenceId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      collectionId:{
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.INTEGER
      },
      lastWatered: {
        type: Sequelize.DATEONLY
      },
      lastFertilized: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),

      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPlants');
  }
};