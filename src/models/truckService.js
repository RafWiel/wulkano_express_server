module.exports = (sequelize, DataTypes) =>
  sequelize.define('TruckService', {
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
    saleDocument: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visitDescription: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    vehicleName: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    registrationNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    vehicleType: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tireDiagnostics: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    isTiresInspection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tiresInspectionCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    tiresInspectionNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isPressureRegulation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pressureRegulationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    pressureRegulationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isWheelWashing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    wheelWashingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    wheelWashingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    wheelWashingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isWheelUnscrewing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    wheelUnscrewingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    wheelUnscrewingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    wheelUnscrewingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isTireInstallation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tireInstallationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    tireInstallationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    tireInstallationDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isWheelBalancing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    wheelBalancingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    wheelBalancingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    wheelBalancingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isWheelWeights: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    wheelWeightsCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    wheelWeightsNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    wheelWeightsDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isWheelCentering: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    wheelCenteringCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    wheelCenteringNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isPinsCleaning: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pinsCleaningCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    pinsCleaningNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isTighteningWithTorqueWrench: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tighteningWithTorqueWrenchCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    tighteningWithTorqueWrenchNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isHandingOverTighteningCard: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    handingOverTighteningCardCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    handingOverTighteningCardNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isPumping: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pumpingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    pumpingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    pumpingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isValveChange: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    valveChangeCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    valveChangeNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    valveChangeDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isExtensionInstallation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    extensionInstallationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    extensionInstallationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    extensionInstallationDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isDeepening: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    deepeningCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    deepeningNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isDeepeningF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isDeepeningD: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isDeepeningT: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isColdHotRepair: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    coldHotRepairCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    coldHotRepairNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    coldHotRepairDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isUtilization: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    utilizationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    utilizationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    utilizationDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isDriveToClient: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    driveToClientCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    driveToClientNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    driveToClientDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isOther: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    otherCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    otherNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    otherDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    otherMaterials: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    isGeometryRecommendation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isShockAbsorbersRecommendation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isBrakesRecommendation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    nextVisitDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nextVisitDescription: {
      type: DataTypes.STRING(512),
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
    timestamps: false
  });
