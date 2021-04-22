'use strict'

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/sqlite_connection');



class user_meetup extends Model {}
user_meetup.init({
  rol: DataTypes.STRING
}, { sequelize,tableName: 'user_meetup', modelName: 'user_meetup' });

module.exports = user_meetup;