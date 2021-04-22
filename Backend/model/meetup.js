const { FailedDependency } = require('http-errors');
const {Model, DataTypes, DATE} = require('sequelize');
const sequelize  = require('../database/sqlite_connection');

class Meetup extends Model {}
Meetup.init({
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  availableVacancy: DataTypes.INTEGER,
  totalVacancy: DataTypes.INTEGER,
  date: DataTypes.DATE,
  location: DataTypes.STRING,
  lat: DataTypes.STRING,
  long:DataTypes.STRING,
  userAdmin: DataTypes.STRING
  // temperature: DataTypes.DECIMAL
}, {sequelize,tableName: 'meetups', modelName: 'meetup' });

module.exports = Meetup;