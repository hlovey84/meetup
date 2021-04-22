'use strict'

const {Sequelize} = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config  = require('../config.json')[env];

let sequelize;
  sequelize = new Sequelize(
    config.database,
    '',
    '',{
        dialect: 'sqlite',
        storage:'./database/database.sqlite'
      });

module.exports = sequelize;