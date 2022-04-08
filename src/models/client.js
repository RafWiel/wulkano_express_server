module.exports = (sequelize, DataTypes) =>
  sequelize.define('Client', {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false
  });