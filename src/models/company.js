module.exports = (sequelize, DataTypes) =>
  sequelize.define('Company', {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    taxId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
