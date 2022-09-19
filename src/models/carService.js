module.exports = (sequelize, DataTypes) =>
  sequelize.define('car_service', {
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
    clientId: {
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
    incorrectTireWearLocation: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    isGeometryRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tireChange: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    isDepositTires: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isDepositAlloys: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isDepositSteels: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isDepositScrews: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isDepositHubcups: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    depositTiresNote: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    depositTiresLocation: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    visualInspectionBrakePadsFront: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionBrakePadsRear: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionBrakeDiscsFront: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionBrakeDiscsRear: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionShockAbsorbers: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionSuspension: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionAirco: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionOil: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionLights: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionWashingFluid: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionBrakeFluid: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionCoolingFluid: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionWipers: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionOther: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    visualInspectionOtherDetails: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    isActionScrewing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionScrewingCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionScrewingPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isActionInstallation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionInstallationCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionInstallationPrice: {
      type: DataTypes.DECIMAL(6, 2),
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
    actionWheelBalancingPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isActionWheelBalancingSteel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActionWheelBalancingAlloy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActionTireRepair: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionTireRepairCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionTireRepairPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isActionRimStraightening: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionRimStraighteningCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionRimStraighteningPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isActionRimStraighteningSteel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActionRimStraighteningAlloy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActionAirValve: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionAirValveCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionAirValvePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    actionAirValveDetails: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isActionNitrogenFill: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actionNitrogenFillCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    actionNitrogenFillPrice: {
      type: DataTypes.DECIMAL(6, 2),
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
    actionUtilizationPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isFastFitBrakePads: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fastFitBrakePadsCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    fastFitBrakePadsPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isFastFitBrakePadsFront: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFastFitBrakePadsRear: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFastFitBrakeDiscs: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fastFitBrakeDiscsCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    fastFitBrakeDiscsPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isFastFitBrakeDiscsFront: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFastFitBrakeDiscsRear: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFastFitShockAbsorbers: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fastFitShockAbsorbersCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    fastFitShockAbsorbersPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isFastFitShockAbsorbersFront: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFastFitShockAbsorbersRear: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFastFitGeometry: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fastFitGeometryCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    fastFitGeometryPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isFastFitFuelFilter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fastFitFuelFilterCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    fastFitFuelFilterPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isInspectionOilChange: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    inspectionOilChangeCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    inspectionOilChangePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isInspectionOilFilterChange: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    inspectionOilFilterChangeCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    inspectionOilFilterChangePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isInspectionAirFilterChange: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    inspectionAirFilterChangeCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    inspectionAirFilterChangePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isInspectionInteriorFilterChange: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    inspectionInteriorFilterChangeCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    inspectionInteriorFilterChangePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isInspectionAirco: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    inspectionAircoCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    inspectionAircoPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    isInspectionAircoCleaning: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isInspectionAircoFilter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isInspectionAircoFilling: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isInspectionOther: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    inspectionOtherCount: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    inspectionOtherPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    inspectionOtherDetails: {
      type: DataTypes.STRING(128),
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
    underscored: true,
  });
