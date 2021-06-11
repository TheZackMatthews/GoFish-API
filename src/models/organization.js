const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');

const organization = sequelizeConnection.define('organization', {
  org_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: [Sequelize.UUID],
    foreignKey: true,
    allowNull: true,
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});

organization.associate = () => {
  organization.hasMany(sequelizeConnection.models.user, {
    foreignKey: 'org_id',
    constraints: false,
  });
  sequelizeConnection.models.user.belongsTo(organization, {
    constraints: false,
    targetKey: 'org_id',
    foreignKey: 'org_id',
  });
};

module.exports = organization;
