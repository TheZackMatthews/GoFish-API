const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');
const volunteerModel = require('./volunteers');
const photo = require('./photo');

const survey = sequelizeConnection.define('survey', {
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
    type: DataTypes.ENUM(['redd', 'carcass', 'live']),
    allowNull: false,
  },
  fish_species: {
    type: DataTypes.ENUM(['coho', 'chinook', 'chum', 'pink', 'sockeye', 'trout', 'kokanee', 'unknown']),
    allowNull: false,
  },
  fish_count: {
    type: DataTypes.INTEGER(),
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT(),
  },
});

survey.associate = () => {
  survey.belongsTo(volunteerModel, { foreignKey: 'volunteersId' });
};
survey.associate = () => {
  survey.hasMany(photo, {
    foreignKey: 'id',
    as: 'photos',
  });
};
module.exports = survey;
