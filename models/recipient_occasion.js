'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipient_occasion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  recipient_occasion.init({
    recipientId: DataTypes.INTEGER,
    occasionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipient_occasion',
  });
  return recipient_occasion;
};