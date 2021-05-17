const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');
const surveyModel = require('./survey');

const photo = sequelizeConnection.define('photo', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  reason_for_submission: {
    type: DataTypes.ENUM(['help identifying', 'outreach', 'other']),
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT(),
  },
});

photo.associate = () => {
  photo.belongsTo(surveyModel, { foreignKey: 'id' });
};

module.exports = photo;
