module.exports = (sequelize, DataTypes) =>
  sequelize.define('TruckTire', {
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
      allowNull: false
    },
    pressure: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
  }, {
    timestamps: false
  });
