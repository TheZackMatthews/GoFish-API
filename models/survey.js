const { Sequelize } = require('sequelize');
const sequelize = require('../index.js');
const volunteers = require('./volunteers');

const { DataTypes } = Sequelize.DataTypes;

const newSurvey = sequelize.define('newSurvey', {
  location: {
    type: DataTypes.JSON(),
  },
  fish_status: {
    type: DataTypes.STRING(7), // redd, carcass, or live
    allowNull: false,
  },
  fish_species: {
    type: DataTypes.STRING(40), // Coho, Chinook, Chum, Pink, Sockeye, Unknown
    allowNull: false,
  },
  fish_count: {
    type: DataTypes.INTEGER(), // redd, carcass, or live
    defaultValue: 0,
  },
  image_url: {
    type: DataTypes.STRING(40), // FIXME How long should this be?
    allowNull: false,
  },
  comments: {
    type: DataTypes.text(),
  },
});

newSurvey.belongsTo(volunteers, {
  foreignKey: 'volunteersId',
  as: volunteers,
});

module.exports = newSurvey;
