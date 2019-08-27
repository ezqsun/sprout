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
    lastFertilized: DataTypes.DATEONLY
  }, {});
  UserPlant.associate = function(models) {
    // associations can be defined here
    UserPlant.belongsTo(models.User, {
      onDelete: 'CASCADE'
    })
  };
  return UserPlant;
};