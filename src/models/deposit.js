module.exports = (sequelize, DataTypes) =>
  sequelize.define('Deposit', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tiresNote: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    tiresLocation: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    employeeSigntaureFilePath: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    clientSigntaureFilePath: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
  }, {
    timestamps: false
  });
