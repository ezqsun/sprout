'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCollection = sequelize.define('UserCollection', {
    id:{
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    location: DataTypes.STRING
  }, {});
  UserCollection.associate = function(models) {
    // associations can be defined here

    UserCollection.hasMany(models.UserPlant)
    UserCollection.belongsTo(models.User, {
      onDelete: 'CASCADE'
    })

  };
  return UserCollection;
};