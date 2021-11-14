'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.gift.belongsTo(models.recipient)
      models.gift.belongsTo(models.occasion)
    }
  };
  gift.init({
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    category: DataTypes.STRING,
    etsyListingId: DataTypes.STRING,
    isPurchased: DataTypes.BOOLEAN,
    store: DataTypes.STRING,
    recipientId: DataTypes.INTEGER,
    occasionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gift',
  });
  return gift;
};