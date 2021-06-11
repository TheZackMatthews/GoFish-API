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
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});

organization.associate = () => {
  sequelizeConnection.models.user.belongsTo(organization, {
    foreignKey: 'org_id',
    allowNull: true,
  });
  organization.hasMany(sequelizeConnection.models.user, {
    foreignKey: 'org_id',
    target: 'user_id', 
    allowNull: true,
  });
};

module.exports = organization;
