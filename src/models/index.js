/* eslint-disable no-console */
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const sequelizeConnection = new Sequelize('GoFish', 'postgres', '5432', {
  host: 'gofish.cjz2iriyd5i6.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 20000, // Error if conncection takes more than 20 seconds
    // idle: 600000, // Allow a connection of 10 minutes maximum, and then force them to reconnect
  },
});

sequelizeConnection.authenticate('')
  .then(() => {
    console.log('Database connected...');
    sequelizeConnection.sync({});
  })
  .catch((err) => {
    console.Error(`Error connecting to db: ${err}`);
  });

const db = {
  sequelizeConnection,
  Sequelize,
  DataTypes,
};

module.exports = db;
