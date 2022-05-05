module.exports = (sequelize, DataTypes) =>
  sequelize.define('Mechanic', {
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  }, {
    timestamps: false
  });
