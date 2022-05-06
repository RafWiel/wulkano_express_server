const {CarService} = require('../models');
const {TruckTire} = require('../models');
const {Client} = require('../models');
const {Mechanic} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const directoriesController = require('./directories');
const tools = require('../misc/tools');
const signature = require('../misc/signature');
const { Op } = require('sequelize');
const tireType = require('../enums/truckTireType');

async function createTires(request, type, array) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    try {
      await TruckTire.create({
        serviceId: request.id,
        type: type,
        location: item.location,
        width: item.width,
        profile: item.profile,
        diameter: item.diameter,
        serial: item.serial,
        brand: item.brand,
        tread: item.tread,
        pressure: item.pressure
      });
    }
    catch (error) {
      return error;
    }
  }

  return true;
}

async function createMechanics(request, array) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    try {
      await Mechanic.create({
        serviceId: request.id,
        name: item.name
      });
    }
    catch (error) {
      return error;
    }
  }

  return true;
}

module.exports = {
  async create (req, res) {
    try {
      console.log(req.body);
      const {name, taxId, phoneNumber, email, city} = req.body.company;

      //find company
      const companies = await sequelize.query(`
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
          name: [name],
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
      let ordinal = await TruckService.max('ordinal', {
        where : {'date': {[Op.gte]: dateStartMonth }}
      });
      ordinal = ordinal === null ? 1 : ordinal + 1;

      const {actions} = req.body;

      CarService.create({
        date: now,
        ordinal: ordinal,
        requestName: `C/${ordinal}/${now.getMonth() + 1}/${now.getFullYear().toString().substr(-2)}`,
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
        isDepositTires: req.body.isDepositTires,
        isDepositAlloys: req.body.isDepositAlloys,
        isDepositSteels: req.body.isDepositSteels,
        isDepositScrews: req.body.isDepositScrews,
        isDepositHubcubs: req.body.isDepositHubcubs,
        depositTiresNote: req.body.depositTiresNote,
        depositTiresLocation: req.body.depositTiresLocation,
        visualInspectionBrakePadsFront: req.body.visualInspectionBrakePadsFront,
        visualInspectionBrakePadsRear: req.body.visualInspectionBrakePadsRear,
        visualInspectionBrakeDiscsFront: req.body.visualInspectionBrakeDiscsFront,
        visualInspectionBrakeDiscsRear: req.body.visualInspectionBrakeDiscsRear,
        visualInspectionShockAbsorbers: req.body.visualInspectionShockAbsorbers,
        visualInspectionSuspension: req.body.visualInspectionSuspension,
        visualInspectionAirco: req.body.visualInspectionAirco,
        visualInspectionOil: req.body.visualInspectionOil,
        visualInspectionLights: req.body.visualInspectionLights,
        visualInspectionWashingFluid: req.body.visualInspectionWashingFluid,
        visualInspectionBrakeFluid: req.body.visualInspectionBrakeFluid,
        visualInspectionCoolingFluid: req.body.visualInspectionCoolingFluid,
        visualInspectionWipers: req.body.visualInspectionWipers,
        visualInspectionOther: req.body.visualInspectionOther,
        visualInspectionOtherDetails: req.body.visualInspectionOtherDetails,

        TUTAJ


        isActionScrewing: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionScrewingCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionScrewingPrice: actions.screwing.isChecked ? actions.screwing.info : null,

        isActionInstallation: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionInstallationCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionInstallationPrice: actions.screwing.isChecked ? actions.screwing.info : null,

        isActionWheelBalancing: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionWheelBalancingCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionWheelBalancingPrice: actions.screwing.isChecked ? actions.screwing.info : null,
        isActionWheelBalancingSteel: actions.screwing.isChecked ? actions.screwing.info : null,
        isActionWheelBalancingAlloy: actions.screwing.isChecked ? actions.screwing.info : null,

        isActionTireRepair: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionTireRepairCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionTireRepairPrice: actions.screwing.isChecked ? actions.screwing.info : null,

        isActionWheelRimStraightening: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionRimStraighteningCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionRimStraighteningPrice: actions.screwing.isChecked ? actions.screwing.info : null,
        isActionRimStraighteningSteel: actions.screwing.isChecked ? actions.screwing.info : null,
        isActionRimStraighteningAlloy: actions.screwing.isChecked ? actions.screwing.info : null,

        isActionAirValve: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionAirValveCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionAirValvePrice: actions.screwing.isChecked ? actions.screwing.info : null,
        actionAirValveDetails: actions.screwing.isChecked ? actions.screwing.info : null,

        isActionNitrogenFill: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionNitrogenFillCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionNitrogenFillPrice: actions.screwing.isChecked ? actions.screwing.info : null,

        isActionUtilization: actions.screwing.isChecked ? actions.screwing.isChecked : null,
        actionUtilizationCount: actions.screwing.isChecked ? actions.screwing.count : null,
        actionUtilizationPrice: actions.screwing.isChecked ? actions.screwing.info : null,






        directoryId: directory.id,
        employeeSignatureFileName: employeeSignatureFileName,
        clientSignatureFileName: clientSignatureFileName,
      })
      .then(async (item) => {
        //add size tires
        const sizeTiresResult = await createTires(item, tireType.size, req.body.sizeTires.filter(u => u.width && u.profile && u.diameter));

        //add installed tires
        const installedTiresResult = await createTires(item, tireType.installed, req.body.installedTires.filter(u => u.width && u.profile && u.diameter));

        //add dismantled tires
        const dismantledTiresResult = await createTires(item, tireType.dismantled, req.body.dismantledTires.filter(u => u.width && u.profile && u.diameter));

        //add mechanics
        const mechanicsResult = await createMechanics(item, req.body.mechanics.filter(u => u.name));

        if (sizeTiresResult === true
          && installedTiresResult === true
          && dismantledTiresResult === true
          && mechanicsResult === true) {
          res.send({
            result: true,
            serviceId: item.id,
          });
        }
        else {
          if (sizeTiresResult !== true) tools.sendError(res, sizeTiresResult);
          if (installedTiresResult !== true) tools.sendError(res, installedTiresResult);
          if (dismantledTiresResult !== true) tools.sendError(res, dismantledTiresResult);
          if (mechanicsResult !== true) tools.sendError(res, mechanicsResult);
        }
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
