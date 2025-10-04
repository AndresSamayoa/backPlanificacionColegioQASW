const sequelize = require('sequelize');

const {
  dbMainDatabase,
  dbMainUsername,
  dbMainPassword,
  dbMainHost,
  dbMainPort,
  dbMainDialect,
  dbMainPoolMax,
  dbMainPoolMin,
} = require('../config/database');

const _main = new sequelize(dbMainDatabase, dbMainUsername, dbMainPassword, {
  host: dbMainHost,
  port: dbMainPort,
  dialect: dbMainDialect,
  encrypt: false,
  pool: {
    max: Number(dbMainPoolMax),
    min: Number(dbMainPoolMin),
    acquire: 60000,
    idle: 10000
  },
  dialectOptions: {
    statement_timeout: 60000,
    useUTC: false,
  },
  timezone: '-06:00'
});

exports._main = _main;
exports.auth = async () => {
  try {
    await _main.authenticate();
  } catch (error) {
    console.error(`Error to conect to ${dbMainDatabase}: ${error}`);
  }
}