/* eslint-disable no-console */
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;

const dbConnectPort = process.env.DBCONNECTPORT;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbConnectPort, {
  host: process.env.DBCONNECTIONURL,
  password: process.env.DBPASSWORD,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 20000,
    // idle: 600000, // Allow a connection of 10 minutes maximum, and then force them to reconnect
  },
});

sequelizeConnection.authenticate('')
  .then(() => {
    console.log('Database connected...');
    Object.values(sequelizeConnection.models).forEach((model) => {
      if (typeof model.associate === 'function') model.associate();
    });
    sequelizeConnection.sync({  });
  })
  .catch((err) => {
    console.error(`Error connecting to db: ${err}`);
  });

const db = {
  sequelizeConnection,
  Sequelize,
  DataTypes,
};

module.exports = db;
