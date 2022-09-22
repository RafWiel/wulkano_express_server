module.exports = (sequelize, DataTypes) =>
  sequelize.define('Deposit', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ordinal: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    requestName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tiresNote: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    tiresLocation: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    isTires: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isAlloys: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isSteels: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isScrews: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isHubcups: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    directoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeSignatureFileName: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    clientSignatureFileName: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
  }, {
    timestamps: false,
  });
