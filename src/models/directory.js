module.exports = (sequelize, DataTypes) =>
  sequelize.define('Directory', {
    path: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
  }, {
    timestamps: false,
  });
