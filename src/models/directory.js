module.exports = (sequelize, DataTypes) =>
  sequelize.define('directory', {
    path: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
  }, {
    timestamps: false,
    underscored: true,
  });
