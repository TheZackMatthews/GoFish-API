/* eslint-disable no-console */
import Sequelize from 'sequelize';

require('dotenv').config();

const { DataTypes } = Sequelize;

const dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbConnectPort = process.env.DBCONNECTPORT;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbConnectPort, {
  host: process.env.DBCONNECTIONURL,
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

export default db;
