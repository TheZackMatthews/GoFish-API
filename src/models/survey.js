const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');
const volunteers = require('./volunteers');

const newSurvey = sequelizeConnection.define('newSurvey', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  location: {
    type: DataTypes.JSON(),
  },
  fish_status: {
    type: DataTypes.STRING(7), // redd, carcass, or live
    allowNull: false,
    validate: {
      isIn: [['redd', 'carcass', 'live']],
    },
  },
  fish_species: {
    type: DataTypes.STRING(40),
    allowNull: false,
    validate: {
      isIn: [['coho', 'chinook', 'chum', 'pink', 'sockeye', 'unknown']],
    },
  },
  fish_count: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  image_url: {
    type: DataTypes.STRING(40), // FIXME How long should this be?
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT(),
  },
  // NOTE: volunteers.js provides a foreign key "volunteersId"
});

newSurvey.associate = () => {
  newSurvey.belongsTo(volunteers, { foreignKey: 'volunteersId' });
};
module.exports = newSurvey;
