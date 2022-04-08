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
    directoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeSigntaureFileName: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    clientSigntaureFileName: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
  }, {
    timestamps: false
  });
