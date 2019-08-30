'use strict';
const bcrypt = require('bcrypt')
const models = require('../models');
const User = models.User;
const UserCollection = models.UserCollection;


module.exports = {
  up: async(queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'demo@demo.com',
    userName: 'johndoe',
    password: bcrypt.hashSync('jd122', 10),
  }], {});

    const user = await User.findOne({
      where: {
        email: 'demo@demo.com',
      }
    })

    await queryInterface.bulkInsert('UserCollections', [{
      userId: user.id,
      location: 'Living Room'
    }], {})

    const collection = await UserCollection.findOne({
      where: {
        userId: user.id
      }
    })

    return await queryInterface.bulkInsert('UserPlants', [{
      collectionId: collection.id,
      trefleReferenceId: 139927,
      name: 'Dave',
      lastWatered: Sequelize.fn('NOW'),
      lastFertilized: Sequelize.fn('NOW'),
      userId: user.id
    },
    {
      collectionId: collection.id,
      trefleReferenceId: 130303,
      name: 'Shirley',
      lastWatered: Sequelize.fn('NOW'),
      lastFertilized: Sequelize.fn('NOW'),
      userId: user.id

    },
    {
      collectionId: collection.id,
      trefleReferenceId: 182519,
      name: 'Bob',
      lastWatered: Sequelize.fn('NOW'),
      lastFertilized: Sequelize.fn('NOW'),
      userId: user.id

    }
  ], {})
  },

  down: async(queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('UserCollections', null, {});
    await queryInterface.bulkDelete('UserPlants', null, {});



  }
};
