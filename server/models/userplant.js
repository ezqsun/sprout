'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPlant = sequelize.define('UserPlant', {
    id:{
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    trefleReferenceId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lastWatered: DataTypes.DATEONLY,
    lastFertilized: DataTypes.DATEONLY,
  }, {});
  UserPlant.associate = function(models) {
    // associations can be defined here
    UserPlant.belongsTo(models.UserCollection, {
      onDelete: 'CASCADE',
      foreignKey: 'collectionId',
      targetKey: 'id'
    })
    UserPlant.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
      targetKey: 'id'
    })
  };
  return UserPlant;
};