const { sequelizeConnection, DataTypes } = require('./index.js');
const VolunteerModel = require('./volunteers');

const DailySurveys = sequelizeConnection.define('dailySurveys', {
  date: {
    type: DataTypes.DATE(),
  },
  individual_survey_comments: {
    type: DataTypes.ARRAY(
      DataTypes.TEXT(),
    ),
  },
  day_end_comments: {
    type: DataTypes.TEXT(),
  },
  creek_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  visibility: {
    type: DataTypes.INTEGER(),
    validate: {
      min: 1,
      max: 6,
    },
  },
  flow_type: {
    type: DataTypes.INTEGER(),
    validate: {
      min: 1,
      max: 5,
    },
  },
  view_condition: {
    type: DataTypes.INTEGER(),
    validate: {
      min: 30,
      max: 38,
    },
  },
  water_condition: {
    type: DataTypes.INTEGER(),
    validate: {
      min: 20,
      max: 29,
    },
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
  trout: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  kokanee: {
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
  trout_carcass: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  kokanee_carcass: {
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
  trout_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  kokanee_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
  unknown_redd: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
  },
});
console.log(sequelizeConnection.models)
DailySurveys.associate = () => {
  sequelizeConnection.models.dailySurveys.belongsTo(VolunteerModel, { foreignKey: 'group_id' });
  VolunteerModel.hasOne(sequelizeConnection.models.dailySurveys, {
    foreignKey: 'group_id'
  });
};

module.exports = DailySurveys;
