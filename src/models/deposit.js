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
  }, {
    timestamps: false
  });
