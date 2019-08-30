'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCollection = sequelize.define('UserCollection', {
    id:{
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    location: DataTypes.STRING,
  }, {});
  UserCollection.associate = function(models) {
    // associations can be defined here

    UserCollection.hasMany(models.UserPlant, {
      foreignKey: 'collectionId',
      targetKey: 'id'
    })
    UserCollection.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
      targetKey: 'id'
    })

  };
  return UserCollection;
};