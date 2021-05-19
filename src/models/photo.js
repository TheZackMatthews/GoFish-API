const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');

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
  sequelizeConnection.models.photo.belongsTo(sequelizeConnection.models.survey, { foreignKey: 'group_id' });
  sequelizeConnection.models.survey.hasMany(sequelizeConnection.models.photo, {
    foreignKey: 'group_id',
    targetKey: 'id',
  });
};
module.exports = photo;
