module.exports = (sequelize, DataTypes) =>
  sequelize.define('DepositTire', {
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
    tire: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    alloy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    steel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    screws: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    hubcups: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    timestamps: false
  });
