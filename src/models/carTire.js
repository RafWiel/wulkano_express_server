module.exports = (sequelize, DataTypes) =>
  sequelize.define('car_tire', {
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profile: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    diameter: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    dot: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    serial: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    tread: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    pressure: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
  }, {
    timestamps: false,
    underscored: true,
  });
