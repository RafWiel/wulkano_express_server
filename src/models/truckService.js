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
      allowNull: false,
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
    isActionTiresInspection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionTiresInspectionCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionTiresInspectionNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionPressureRegulation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionPressureRegulationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionPressureRegulationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionWheelWashing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionWheelWashingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionWheelWashingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionWheelWashingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionWheelUnscrewing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionWheelUnscrewingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionWheelUnscrewingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionWheelUnscrewingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionTireInstallation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionTireInstallationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionTireInstallationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionTireInstallationDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionWheelBalancing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionWheelBalancingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionWheelBalancingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionWheelBalancingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionWheelWeights: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionWheelWeightsCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionWheelWeightsNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionWheelWeightsDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionWheelCentering: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionWheelCenteringCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionWheelCenteringNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionPinsCleaning: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionPinsCleaningCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionPinsCleaningNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionTighteningWithTorqueWrench: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionTighteningWithTorqueWrenchCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionTighteningWithTorqueWrenchNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionHandingOverTighteningCard: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionHandingOverTighteningCardCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionHandingOverTighteningCardNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionPumping: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionPumpingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionPumpingNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionPumpingDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionValveChange: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionValveChangeCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionValveChangeNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionValveChangeDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionExtensionInstallation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionExtensionInstallationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionExtensionInstallationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionExtensionInstallationDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionDeepening: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionDeepeningCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionDeepeningNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionDeepeningF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActionDeepeningD: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActionDeepeningT: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActionColdHotRepair: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionColdHotRepairCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionColdHotRepairNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionColdHotRepairDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionUtilization: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionUtilizationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionUtilizationNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionUtilizationDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionDriveToClient: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionDriveToClientCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionDriveToClientNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionDriveToClientDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionOther: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionOtherCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionOtherNote: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    actionOtherDetails: {
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
    timestamps: false,
  });
