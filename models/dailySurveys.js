const { Sequelize } = require('sequelize');
const sequelize = require('../index.js');

const { DataTypes } = Sequelize.DataTypes;

const allSurveys = sequelize.define('dailySurveys', {
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
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  chinook: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  chum: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  pink: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  sockeye: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  unknown: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  coho_carcass: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  chinook_carcass: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  chum_carcass: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  pink_carcass: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  sockeye_carcass: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  unknown_carcass: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  coho_redd: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  chinook_redd: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  chum_redd: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  pink_redd: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  sockeye_redd: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  unknown_redd: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
});

module.exports = allSurveys;
