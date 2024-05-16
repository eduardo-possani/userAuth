// userItemAccess.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./user');
const Pary = require('./pary');

const userAccess = sequelize.define('UserItemAccess', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  paryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pary,
      key: 'id'
    }
  },
  onDelete: 'CASCADE'
});

module.exports =  userAccess;
