'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class occasion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.occasion.hasMany(models.gift)
      models.occasion.belongsToMany(models.recipient, {through: "recipient_occasion"})
    }
  };
  occasion.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'occasion',
  });
  return occasion;
};