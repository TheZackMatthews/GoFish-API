const Sequelize = require('sequelize');
const { sequelizeConnection, DataTypes } = require('./index.js').default;

const allSurveys = sequelizeConnection.define('dailySurveys', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  individual_survey_comments: {
    type: DataTypes.ARRAY(
      DataTypes.TEXT(),
    ),
  },
  day_end_comments: {
    type: DataTypes.TEXT(),
  },
  coho: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  chinook: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  chum: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  pink: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  sockeye: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  unknown: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  coho_carcass: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  chinook_carcass: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  chum_carcass: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  pink_carcass: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  sockeye_carcass: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  unknown_carcass: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  coho_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  chinook_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  chum_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  pink_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  sockeye_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  unknown_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
});

module.exports = allSurveys;
