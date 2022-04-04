module.exports = (sequelize, DataTypes) =>
  sequelize.define('Client', {
    depositId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    profile: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    diameter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dot: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    tread: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
  }, {
    timestamps: false
  });
