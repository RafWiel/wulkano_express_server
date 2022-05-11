const {CarService} = require('../models');
const {TruckTire} = require('../models');
const {Client} = require('../models');
const {Company} = require('../models');
const {Mechanic} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const directoriesController = require('./directories');
const tools = require('../misc/tools');
const signature = require('../misc/signature');
const { Op } = require('sequelize');
const tireType = require('../enums/truckTireType');

// async function createTires(request, type, array) {
//   for (let i = 0; i < array.length; i++) {
//     const item = array[i];

//     try {
//       await TruckTire.create({
//         serviceId: request.id,
//         type: type,
//         location: item.location,
//         width: item.width,
//         profile: item.profile,
//         diameter: item.diameter,
//         serial: item.serial,
//         brand: item.brand,
//         tread: item.tread,
//         pressure: item.pressure
//       });
//     }
//     catch (error) {
//       return error;
//     }
//   }

//   return true;
// }

// async function createMechanics(request, array) {
//   for (let i = 0; i < array.length; i++) {
//     const item = array[i];

//     try {
//       await Mechanic.create({
//         serviceId: request.id,
//         name: item.name
//       });
//     }
//     catch (error) {
//       return error;
//     }
//   }

//   return true;
// }

module.exports = {
  async create (req, res) {
    try {
      console.log(req.body);
      const {name, companyName, phoneNumber, email} = req.body.client;

      //find client
      const clients = await sequelize.query(`
        select id
        from Clients
        where (
          phoneNumber = :phoneNumber or (
            email = :email and
            email != '' and
            email is not null
          )
        )
      `, {
        type: QueryTypes.SELECT,
        replacements: {
          phoneNumber: [phoneNumber],
          email: [email],
        },
      });

      let [client] = clients;

      // create client
      if (client === undefined) {
        client = await Client.create({
          name,
          companyName,
          phoneNumber,
          email,
        });
      }

      //get current month directory
      const directory = await directoriesController.getDirectory();

      const employeeSignatureFileName = signature.save(req.body.signature.employee, directory, res);
      const clientSignatureFileName = signature.save(req.body.signature.client, directory, res);

      // get max ordinal for current month
      const now = new Date();
      const dateStartMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      let ordinal = await CarService.max('ordinal', {
        where : {'date': {[Op.gte]: dateStartMonth }}
      });
      ordinal = ordinal === null ? 1 : ordinal + 1;

      const { deposit, visualInspection, actions, fastFit, inspection } = req.body;

      CarService.create({
        date: now,
        ordinal: ordinal,
        requestName: `O/${ordinal}/${now.getMonth() + 1}/${now.getFullYear().toString().substr(-2)}`,
        saleDocument: req.body.saleDocument,
        clientId: client.id,
        visitDescription: req.body.description,
        vehicleName: req.body.vehicle.name,
        registrationNumber: req.body.vehicle.registrationNumber,
        vehicleType: req.body.vehicle.type,
        mileage: req.body.vehicle.mileage,
        incorrectTireWearLocation: req.body.incorrectTireWearLocation,
        isGeometryRequired: req.body.isGeometryRequired,
        tireChange: req.body.tireChange,
        isDepositTires: deposit.isDepositTires,
        isDepositAlloys: deposit.isDepositAlloys,
        isDepositSteels: deposit.isDepositSteels,
        isDepositScrews: deposit.isDepositScrews,
        isDepositHubcubs: deposit.isDepositHubcubs,
        depositTiresNote: req.body.depositTiresNote,
        depositTiresLocation: req.body.depositTiresLocation,
        visualInspectionBrakePadsFront: visualInspection.brakePads.front.status,
        visualInspectionBrakePadsRear: visualInspection.brakePads.rear.status,
        visualInspectionBrakeDiscsFront: visualInspection.brakeDiscs.front.status,
        visualInspectionBrakeDiscsRear: visualInspection.brakeDiscs.rear.status,
        visualInspectionShockAbsorbers: visualInspection.shockAbsorbers.status,
        visualInspectionSuspension: visualInspection.suspension.status,
        visualInspectionAirco: visualInspection.airco.status,
        visualInspectionOil: visualInspection.oil.status,
        visualInspectionLights: visualInspection.lights.status,
        visualInspectionWashingFluid: visualInspection.washingFluid.status,
        visualInspectionBrakeFluid: visualInspection.brakeFluid.status,
        visualInspectionCoolingFluid: visualInspection.coolingFluid.status,
        visualInspectionWipers: visualInspection.wipers.status,
        visualInspectionOther: visualInspection.other.status,
        visualInspectionOtherDetails: visualInspection.other.extraInfo,
        isActionScrewing: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionScrewingCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionScrewingPrice: actions.screwing.isChecked ? actions.screwing.price : null,
        isActionInstallation: actions.installation.isChecked ? actions.installation.isChecked : null,
        actionInstallationCount: actions.installation.isChecked ? actions.installation.count : null,
        actionInstallationPrice: actions.installation.isChecked ? actions.installation.price : null,
        isActionWheelBalancing: actions.wheelBalancing.isChecked ? actions.wheelBalancing.isChecked : null,
        actionWheelBalancingCount: actions.wheelBalancing.isChecked ? actions.wheelBalancing.count : null,
        actionWheelBalancingPrice: actions.wheelBalancing.isChecked ? actions.wheelBalancing.price : null,
        isActionWheelBalancingSteel: actions.wheelBalancing.isChecked ? actions.wheelBalancing.isSteel : null,
        isActionWheelBalancingAlloy: actions.wheelBalancing.isChecked ? actions.wheelBalancing.isAlloy : null,
        isActionTireRepair: actions.tireRepair.isChecked ? actions.tireRepair.isChecked : null,
        actionTireRepairCount: actions.tireRepair.isChecked ? actions.tireRepair.count : null,
        actionTireRepairPrice: actions.tireRepair.isChecked ? actions.tireRepair.price : null,
        isActionRimStraightening: actions.rimStraightening.isChecked ? actions.rimStraightening.isChecked : null,
        actionRimStraighteningCount: actions.rimStraightening.isChecked ? actions.rimStraightening.count : null,
        actionRimStraighteningPrice: actions.rimStraightening.isChecked ? actions.rimStraightening.price : null,
        isActionRimStraighteningSteel: actions.rimStraightening.isChecked ? actions.rimStraightening.isSteel : null,
        isActionRimStraighteningAlloy: actions.rimStraightening.isChecked ? actions.rimStraightening.isAlloy : null,
        isActionAirValve: actions.airValve.isChecked ? actions.airValve.isChecked : null,
        actionAirValveCount: actions.airValve.isChecked ? actions.airValve.count : null,
        actionAirValvePrice: actions.airValve.isChecked ? actions.airValve.price : null,
        actionAirValveDetails: actions.airValve.isChecked ? actions.airValve.extraInfo : null,
        isActionNitrogenFill: actions.nitrogenFill.isChecked ? actions.nitrogenFill.isChecked : null,
        actionNitrogenFillCount: actions.nitrogenFill.isChecked ? actions.nitrogenFill.count : null,
        actionNitrogenFillPrice: actions.nitrogenFill.isChecked ? actions.nitrogenFill.price : null,
        isActionUtilization: actions.utilization.isChecked ? actions.utilization.isChecked : null,
        actionUtilizationCount: actions.utilization.isChecked ? actions.utilization.count : null,
        actionUtilizationPrice: actions.utilization.isChecked ? actions.utilization.price : null,
        isFastFitBrakePads: fastFit.brakePads.isChecked ? fastFit.brakePads.isChecked : null,
        fastFitBrakePadsCount: fastFit.brakePads.isChecked ? fastFit.brakePads.count : null,
        fastFitBrakePadsPrice: fastFit.brakePads.isChecked ? fastFit.brakePads.price : null,
        isFastFitBrakePadsFront: fastFit.brakePads.isChecked ? fastFit.brakePads.isFront : null,
        isFastFitBrakePadsRear: fastFit.brakePads.isChecked ? fastFit.brakePads.isRear : null,
        isFastFitBrakeDiscs: fastFit.brakeDiscs.isChecked ? fastFit.brakeDiscs.isChecked : null,
        fastFitBrakeDiscsCount: fastFit.brakeDiscs.isChecked ? fastFit.brakeDiscs.count : null,
        fastFitBrakeDiscsPrice: fastFit.brakeDiscs.isChecked ? fastFit.brakeDiscs.price : null,
        isFastFitBrakeDiscsFront: fastFit.brakeDiscs.isChecked ? fastFit.brakeDiscs.isFront : null,
        isFastFitBrakeDiscsRear: fastFit.brakeDiscs.isChecked ? fastFit.brakeDiscs.isRear : null,
        isFastFitShockAbsorbers: fastFit.shockAbsorbers.isChecked ? fastFit.shockAbsorbers.isChecked : null,
        fastFitShockAbsorbersCount: fastFit.shockAbsorbers.isChecked ? fastFit.shockAbsorbers.count : null,
        fastFitShockAbsorbersPrice: fastFit.shockAbsorbers.isChecked ? fastFit.shockAbsorbers.price : null,
        isFastFitShockAbsorbersFront: fastFit.shockAbsorbers.isChecked ? fastFit.shockAbsorbers.isFront : null,
        isFastFitShockAbsorbersRear: fastFit.shockAbsorbers.isChecked ? fastFit.shockAbsorbers.isRear : null,
        isFastFitGeometry: fastFit.geometry.isChecked ? fastFit.geometry.isChecked : null,
        fastFitGeometryCount: fastFit.geometry.isChecked ? fastFit.geometry.count : null,
        fastFitGeometryPrice: fastFit.geometry.isChecked ? fastFit.geometry.price : null,
        isFastFitFuelFilter: fastFit.fuelFilter.isChecked ? fastFit.fuelFilter.isChecked : null,
        fastFitFuelFilterCount: fastFit.fuelFilter.isChecked ? fastFit.fuelFilter.count : null,
        fastFitFuelFilterPrice: fastFit.fuelFilter.isChecked ? fastFit.fuelFilter.price : null,
        isInspectionOilChange: inspection.oil.isChecked ? inspection.oil.isChecked : null,
        inspectionOilChangeCount: inspection.oil.isChecked ? inspection.oil.count : null,
        inspectionOilChangePrice: inspection.oil.isChecked ? inspection.oil.price : null,
        isInspectionOilFilterChange: inspection.oilFilter.isChecked ? inspection.oilFilter.isChecked : null,
        inspectionOilFilterChangeCount: inspection.oilFilter.isChecked ? inspection.oilFilter.count : null,
        inspectionOilFilterChangePrice: inspection.oilFilter.isChecked ? inspection.oilFilter.price : null,
        isInspectionAirFilterChange: inspection.airFilter.isChecked ? inspection.airFilter.isChecked : null,
        inspectionAirFilterChangeCount: inspection.airFilter.isChecked ? inspection.airFilter.count : null,
        inspectionAirFilterChangePrice: inspection.airFilter.isChecked ? inspection.airFilter.price : null,
        isInspectionInteriorFilterChange: inspection.interiorFilter.isChecked ? inspection.interiorFilter.isChecked : null,
        inspectionInteriorFilterChangeCount: inspection.interiorFilter.isChecked ? inspection.interiorFilter.count : null,
        inspectionInteriorFilterChangePrice: inspection.interiorFilter.isChecked ? inspection.interiorFilter.price : null,
        isInspectionAirco: inspection.airco.isChecked ? inspection.airco.isChecked : null,
        inspectionAircoCount: inspection.airco.isChecked ? inspection.airco.count : null,
        inspectionAircoPrice: inspection.airco.isChecked ? inspection.airco.price : null,
        isInspectionAircoCleaning: inspection.airco.isChecked ? inspection.airco.isCleaning : null,
        isInspectionAircoFilter: inspection.airco.isChecked ? inspection.airco.isFilter : null,
        isInspectionAircoFilling: inspection.airco.isChecked ? inspection.airco.isFilling : null,
        isInspectionOther: inspection.other.isChecked ? inspection.other.isChecked : null,
        inspectionOtherCount: inspection.other.isChecked ? inspection.other.count : null,
        inspectionOtherPrice: inspection.other.isChecked ? inspection.other.price : null,
        inspectionOtherDetails: inspection.other.isChecked ? inspection.other.extraInfo : null,
        directoryId: directory.id,
        employeeSignatureFileName: employeeSignatureFileName,
        clientSignatureFileName: clientSignatureFileName,
      })
      .then(async (item) => {
        //add size tires
        //const sizeTiresResult = await createTires(item, tireType.size, req.body.sizeTires.filter(u => u.width && u.profile && u.diameter));

        //add installed tires
        //const installedTiresResult = await createTires(item, tireType.installed, req.body.installedTires.filter(u => u.width && u.profile && u.diameter));

        //add dismantled tires
        //const dismantledTiresResult = await createTires(item, tireType.dismantled, req.body.dismantledTires.filter(u => u.width && u.profile && u.diameter));

        //add mechanics
        //const mechanicsResult = await createMechanics(item, req.body.mechanics.filter(u => u.name));

        // if (sizeTiresResult === true
        //   && installedTiresResult === true
        //   && dismantledTiresResult === true
        //   && mechanicsResult === true) {
        //   res.send({
        //     result: true,
        //     serviceId: item.id,
        //   });
        // }
        // else {
        //   if (sizeTiresResult !== true) tools.sendError(res, sizeTiresResult);
        //   if (installedTiresResult !== true) tools.sendError(res, installedTiresResult);
        //   if (dismantledTiresResult !== true) tools.sendError(res, dismantledTiresResult);
        //   if (mechanicsResult !== true) tools.sendError(res, mechanicsResult);
        // }

        res.send({
          result: true,
          serviceId: item.id,
        });





      })
      .catch((error) => tools.sendError(res, error));
    }
    catch (error) {
      tools.sendError(res, error);
    }
  },
  async getOne (req, res) {
    try {
      //get deposit
      const items = await sequelize.query(`
        select *
        from TruckServices
        where id = :id
      `, {
        type: QueryTypes.SELECT,
        replacements: { id: req.params.id },
      });

      const [item] = items.map(item => ({
        id: item.id,
        date: item.date,
        ordinal: item.ordinal,
        requestName: item.requestName,
        saleDocument: item.saleDocument,
        companyId: item.companyId,
        description: item.visitDescription,
        vehicle: {
          name: item.vehicleName,
          registrationNumber: item.registrationNumber,
          type: item.vehicleType,
          mileage: item.mileage,
        },
        tireDiagnostics: item.tireDiagnostics,
        actions: {
          tiresInspection: {
            isChecked: item.isActionTiresInspection,
            count: item.actionTiresInspectionCount,
            info: item.actionTiresInspectionNote,
          },
          pressureRegulation: {
            isChecked: item.isActionPressureRegulation,
            count: item.actionPressureRegulationCount,
            info: item.actionPressureRegulationNote,
          },
          wheelWashing: {
            isChecked: item.isActionWheelWashing,
            count: item.actionWheelWashingCount,
            info: item.actionWheelWashingNote,
            extraInfo: item.actionWheelWashingDetails,
          },
          wheelUnscrewing: {
            isChecked: item.isActionWheelUnscrewing,
            count: item.actionWheelUnscrewingCount,
            info: item.actionWheelUnscrewingNote,
            extraInfo: item.actionWheelUnscrewingDetails,
          },
          tireInstallation: {
            isChecked: item.isActionTireInstallation,
            count: item.actionTireInstallationCount,
            info: item.actionTireInstallationNote,
            extraInfo: item.actionTireInstallationDetails,
          },
          wheelBalancing: {
            isChecked: item.isActionWheelBalancing,
            count: item.actionWheelBalancingCount,
            info: item.actionWheelBalancingNote,
            extraInfo: item.actionWheelBalancingDetails,
          },
          wheelWeights: {
            isChecked: item.isActionWheelWeights,
            count: item.actionWheelWeightsCount,
            info: item.actionWheelWeightsNote,
            extraInfo: item.actionWheelWeightsDetails,
          },
          wheelCentering: {
            isChecked: item.isActionWheelCentering,
            count: item.actionWheelCenteringCount,
            info: item.actionWheelCenteringNote,
          },
          pinsCleaning: {
            isChecked: item.isActionPinsCleaning,
            count: item.actionPinsCleaningCount,
            info: item.actionPinsCleaningNote,
          },
          tighteningWithTorqueWrench: {
            isChecked: item.isActionTighteningWithTorqueWrench,
            count: item.actionTighteningWithTorqueWrenchCount,
            info: item.actionTighteningWithTorqueWrenchNote,
          },
          handingOverTighteningCard: {
            isChecked: item.isActionHandingOverTighteningCard,
            count: item.actionHandingOverTighteningCardCount,
            info: item.actionHandingOverTighteningCardNote,
          },
          pumping: {
            isChecked: item.isActionPumping,
            count: item.actionPumpingCount,
            info: item.actionPumpingNote,
            extraInfo: item.actionPumpingDetails,
          },
          valveChange: {
            isChecked: item.isActionValveChange,
            count: item.actionValveChangeCount,
            info: item.actionValveChangeNote,
            extraInfo: item.actionValveChangeDetails,
          },
          extensionInstallation: {
            isChecked: item.isActionExtensionInstallation,
            count: item.actionExtensionInstallationCount,
            info: item.actionExtensionInstallationNote,
            extraInfo: item.actionExtensionInstallationDetails,
          },
          deepening: {
            isChecked: item.isActionDeepening,
            count: item.actionDeepeningCount,
            info: item.actionDeepeningNote,
            f: item.isActionDeepeningF,
            d: item.isActionDeepeningD,
            t: item.isActionDeepeningT,
          },
          coldHotRepair: {
            isChecked: item.isActionColdHotRepair,
            count: item.actionColdHotRepairCount,
            info: item.actionColdHotRepairNote,
            extraInfo: item.actionColdHotRepairDetails,
          },
          utilization: {
            isChecked: item.isActionUtilization,
            count: item.actionUtilizationCount,
            info: item.actionUtilizationNote,
            extraInfo: item.actionUtilizationDetails,
          },
          driveToClient: {
            isChecked: item.isActionDriveToClient,
            count: item.actionDriveToClientCount,
            info: item.actionDriveToClientNote,
            extraInfo: item.actionDriveToClientDetails,
          },
          other: {
            isChecked: item.isActionOther,
            count: item.actionOtherCount,
            info: item.actionOtherNote,
            extraInfo: item.actionOtherDetails,
          },
        },
        otherMaterials: item.otherMaterials,
        recommendations: {
          geometry: item.isGeometryRecommendation,
          shockAbsorbers: item.isShockAbsorbersRecommendation,
          brakes: item.isBrakesRecommendation,
        },
        nextVisit:{
          date: item.nextVisitDate,
          description: item.nextVisitDescription,
        },
        directoryId: item.directoryId,
        employeeSignatureFileName: item.employeeSignatureFileName,
        clientSignatureFileName: item.clientSignatureFileName,
      }));

      //const [item] = items;

      //get company
      item.company = await Company.findOne({
        where : { id: item.companyId },
      });

      // get size tires
      item.sizeTires = await TruckTire.findAll({
        where : {
          serviceId: item.id,
          type: tireType.size,
       },
      });

      // get installed tires
      item.installedTires = await TruckTire.findAll({
        where : {
          serviceId: item.id,
          type: tireType.installed,
       },
      });

      // get dismantled tires
      item.dismantledTires = await TruckTire.findAll({
        where : {
          serviceId: item.id,
          type: tireType.dismantled,
       },
      });

      // get mechanics
      item.mechanics = await Mechanic.findAll({
        attributes: [ 'name' ],
        where : {
          serviceId: item.id
       },
      });

      res.send({ item });
    } catch (error) {
      tools.sendError(res, error);
    }
  },
}
