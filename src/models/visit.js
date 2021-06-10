const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');

const visit = sequelizeConnection.define('visit', {
  group_id: {
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
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
  },
  view_condition: {
    type: DataTypes.INTEGER(),
  },
  day_end_comments: {
    type: DataTypes.TEXT(),
  },
  flow_type: {
    type: DataTypes.INTEGER(),
  },
  visibility: {
    type: DataTypes.INTEGER(),
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});

// any value to adding start location? could be useful for
// the front end at least

visit.associate = () => {
  sequelizeConnection.models.survey.belongsTo(visit, { foreignKey: 'group_id' });
  visit.hasMany(sequelizeConnection.models.survey, {
    foreignKey: 'group_id',
    targetKey: 'id',
  });
};

module.exports = visit;
