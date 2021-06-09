const { sequelizeConnection, Sequelize, DataTypes } = require('./index.js');

const user = sequelizeConnection.define('user', {
  user_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  uid: DataTypes.STRING,
  profile_picture: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  total_visits: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});

module.exports = user;
