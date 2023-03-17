/* eslint-disable */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('admin', 'user'),
      lastLogin: DataTypes.DATE,
      isActive: DataTypes.BOOLEAN,
      confirmationCode: DataTypes.STRING,
      expirationDate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'users',
    },
  );
  return users;
};
