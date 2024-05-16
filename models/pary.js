const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./user');

const Pary = sequelize.define('User', {
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  division: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expenses:{
    type: DataTypes.ARRAY,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User, 
      key: 'id' 
    },
    onDelete: 'CASCADE'
  }
});

Pary.belongsToMany(User, { through: 'userAccess' });

module.exports =  Pary;
