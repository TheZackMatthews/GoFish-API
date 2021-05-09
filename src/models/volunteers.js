const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');
const survey = require('./survey');
const dailySurveys = require('./dailySurveys');

const newVolunteers = sequelizeConnection.define('newVolunteers', {
  volunteersId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
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

newVolunteers.hasMany(survey, {
  foreignKey: 'volunteersId',
  as: 'surveys',
});

newVolunteers.hasOne(dailySurveys, {
  foreignKey: 'volunteersId',
  as: 'daily_surveys',
});
// Create table if it does not exist currently
// FIXME "force: true" empties our table each time we run the server
sequelizeConnection.sync({ force: true });

module.exports = newVolunteers;
