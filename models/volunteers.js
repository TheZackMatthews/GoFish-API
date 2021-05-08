const { Sequelize } = require('sequelize');
const sequelize = require('./index.js');

const { DataTypes } = Sequelize.DataTypes;
const survey = require('./survey');

const newVolunteers = sequelize.define('newVolunteers', {
  creek_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  team_lead: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  team_members: {
    type: DataTypes.ARRAY(
      DataTypes.STRING(40),
    ),
    allowNull: false,
  },
  started_at: {
    type: DataTypes.DATE(),
    default: new Date(),
  },
  ended_at: {
    type: DataTypes.DATE(),
  },
  distance_walked: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  water_condition: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  view_condition: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
});

// TODO need to figure out how to push a survey to this specific instance of volunteers
newVolunteers.hasMany(survey, { as: 'surveys' });

// Create table if it does not exist currently
sequelize.sync({ force: true });

module.exports = newVolunteers;
