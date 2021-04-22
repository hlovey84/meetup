const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/sqlite_connection');

class User extends Model {}
User.init({
  name: DataTypes.STRING,
  lastname: DataTypes.STRING,
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  country: DataTypes.STRING,
  password: DataTypes.STRING,
  rol:  DataTypes.STRING
}, {sequelize, modelName: 'users'});

module.exports = User;