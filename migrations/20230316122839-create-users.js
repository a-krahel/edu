/* eslint-disable */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        defaultValue: 'user',
        type: Sequelize.ENUM('admin', 'user'),
      },
      lastLogin: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
      isActive: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      confirmationCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      expirationDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
