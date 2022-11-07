module.exports = (sequelize, DataTypes) =>
  sequelize.define('Company', {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    taxId: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
