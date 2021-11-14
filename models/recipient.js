'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.recipient.belongsTo(models.user)
      models.recipient.hasMany(models.gift)
      models.recipient.belongsToMany(models.occasion, {through: "recipient_occasion"})
    }
  };
  recipient.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    relationship: DataTypes.STRING,
    interests: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipient',
  });
  return recipient;
};