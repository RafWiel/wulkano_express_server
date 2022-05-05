const {TruckService} = require('../models');
const {TruckTire} = require('../models');
const {Company} = require('../models');
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
        from Companies
        where (
          name = :name or
          taxId = :taxId or
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
          taxId: [taxId],
          phoneNumber: [phoneNumber],
          email: [email],
        },
      });

      let [company] = companies;

      // create company
      if (company === undefined) {
        company = await Company.create({
          name,
          taxId,
          phoneNumber,
          email,
          city
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

      TruckService.create({
        date: now,
        ordinal: ordinal,
        requestName: `C/${ordinal}/${now.getMonth() + 1}/${now.getFullYear().toString().substr(-2)}`,
        saleDocument: req.body.saleDocument,
        companyId: company.id,
        visitDescription: req.body.description,
        vehicleName: req.body.vehicle.name,
        registrationNumber: req.body.vehicle.registrationNumber,
        vehicleType: req.body.vehicle.type,
        mileage: req.body.vehicle.mileage,
        tireDiagnostics: req.body.tireDiagnostics,
        isActionTiresInspection: actions.tiresInspection.isChecked ? actions.tiresInspection.isChecked : null,
        actionTiresInspectionCount: actions.tiresInspection.isChecked ? actions.tiresInspection.count : null,
        actionTiresInspectionNote: actions.tiresInspection.isChecked ? actions.tiresInspection.info : null,
        isActionPressureRegulation: actions.pressureRegulation.isChecked ? actions.pressureRegulation.isChecked : null,
        actionPressureRegulationCount: actions.pressureRegulation.isChecked ? actions.pressureRegulation.count : null,
        actionPressureRegulationNote: actions.pressureRegulation.isChecked ? actions.pressureRegulation.info : null,
        isActionWheelWashing: actions.wheelWashing.isChecked ? actions.wheelWashing.isChecked : null,
        actionWheelWashingCount: actions.wheelWashing.isChecked ? actions.wheelWashing.count : null,
        actionWheelWashingNote: actions.wheelWashing.isChecked ? actions.wheelWashing.info : null,
        actionWheelWashingDetails: actions.wheelWashing.isChecked ? actions.wheelWashing.extraInfo : null,
        isActionWheelUnscrewing: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.isChecked : null,
        actionWheelUnscrewingCount: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.count : null,
        actionWheelUnscrewingNote: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.info : null,
        actionWheelUnscrewingDetails: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.extraInfo : null,
        isActionTireInstallation: actions.tireInstallation.isChecked ? actions.tireInstallation.isChecked : null,
        actionTireInstallationCount: actions.tireInstallation.isChecked ? actions.tireInstallation.count : null,
        actionTireInstallationNote: actions.tireInstallation.isChecked ? actions.tireInstallation.info : null,
        actionTireInstallationDetails: actions.tireInstallation.isChecked ? actions.tireInstallation.extraInfo : null,
        isActionWheelBalancing: actions.wheelBalancing.isChecked ? actions.wheelBalancing.isChecked : null,
        actionWheelBalancingCount: actions.wheelBalancing.isChecked ? actions.wheelBalancing.count : null,
        actionWheelBalancingNote: actions.wheelBalancing.isChecked ? actions.wheelBalancing.info : null,
        actionWheelBalancingDetails: actions.wheelBalancing.isChecked ? actions.wheelBalancing.extraInfo : null,
        isActionWheelWeights: actions.wheelWeights.isChecked ? actions.wheelWeights.isChecked : null,
        actionWheelWeightsCount: actions.wheelWeights.isChecked ? actions.wheelWeights.count : null,
        actionWheelWeightsNote: actions.wheelWeights.isChecked ? actions.wheelWeights.info : null,
        actionWheelWeightsDetails: actions.wheelWeights.isChecked ? actions.wheelWeights.extraInfo : null,
        isActionWheelCentering: actions.wheelCentering.isChecked ? actions.wheelCentering.isChecked : null,
        actionWheelCenteringCount: actions.wheelCentering.isChecked ? actions.wheelCentering.count : null,
        actionWheelCenteringNote: actions.wheelCentering.isChecked ? actions.wheelCentering.info : null,
        isActionPinsCleaning: actions.pinsCleaning.isChecked ? actions.pinsCleaning.isChecked : null,
        actionPinsCleaningCount: actions.pinsCleaning.isChecked ? actions.pinsCleaning.count : null,
        actionPinsCleaningNote: actions.pinsCleaning.isChecked ? actions.pinsCleaning.info : null,
        isActionTighteningWithTorqueWrench: actions.tighteningWithTorqueWrench.isChecked ? actions.tighteningWithTorqueWrench.isChecked : null,
        actionTighteningWithTorqueWrenchCount: actions.tighteningWithTorqueWrench.isChecked ? actions.tighteningWithTorqueWrench.count : null,
        actionTighteningWithTorqueWrenchNote: actions.tighteningWithTorqueWrench.isChecked ? actions.tighteningWithTorqueWrench.info : null,
        isActionHandingOverTighteningCard: actions.handingOverTighteningCard.isChecked ? actions.handingOverTighteningCard.isChecked : null,
        actionHandingOverTighteningCardCount: actions.handingOverTighteningCard.isChecked ? actions.handingOverTighteningCard.count : null,
        actionHandingOverTighteningCardNote: actions.handingOverTighteningCard.isChecked ? actions.handingOverTighteningCard.info : null,
        isActionPumping: actions.pumping.isChecked ? actions.pumping.isChecked : null,
        actionPumpingCount: actions.pumping.isChecked ? actions.pumping.count : null,
        actionPumpingNote: actions.pumping.isChecked ? actions.pumping.info : null,
        actionPumpingDetails: actions.pumping.isChecked ? actions.pumping.extraInfo : null,
        isActionValveChange: actions.valveChange.isChecked ? actions.valveChange.isChecked : null,
        actionValveChangeCount: actions.valveChange.isChecked ? actions.valveChange.count : null,
        actionValveChangeNote: actions.valveChange.isChecked ? actions.valveChange.info : null,
        actionValveChangeDetails: actions.valveChange.isChecked ? actions.valveChange.extraInfo : null,
        isActionExtensionInstallation: actions.extensionInstallation.isChecked ? actions.extensionInstallation.isChecked : null,
        actionExtensionInstallationCount: actions.extensionInstallation.isChecked ? actions.extensionInstallation.count : null,
        actionExtensionInstallationNote: actions.extensionInstallation.isChecked ? actions.extensionInstallation.info : null,
        actionExtensionInstallationDetails: actions.extensionInstallation.isChecked ? actions.extensionInstallation.extraInfo : null,
        isActionDeepening: actions.deepening.isChecked ? actions.deepening.isChecked : null,
        actionDeepeningCount: actions.deepening.isChecked ? actions.deepening.count : null,
        actionDeepeningNote: actions.deepening.isChecked ? actions.deepening.info : null,
        isActionDeepeningF: actions.deepening.isChecked ? actions.deepening.f : null,
        isActionDeepeningD: actions.deepening.isChecked ? actions.deepening.d : null,
        isActionDeepeningT: actions.deepening.isChecked ? actions.deepening.t : null,
        isActionColdHotRepair: actions.coldHotRepair.isChecked ? actions.coldHotRepair.isChecked : null,
        actionColdHotRepairCount: actions.coldHotRepair.isChecked ? actions.coldHotRepair.count : null,
        actionColdHotRepairNote: actions.coldHotRepair.isChecked ? actions.coldHotRepair.info : null,
        actionColdHotRepairDetails: actions.coldHotRepair.isChecked ? actions.coldHotRepair.extraInfo : null,
        isActionUtilization: actions.utilization.isChecked ? actions.utilization.isChecked : null,
        actionUtilizationCount: actions.utilization.isChecked ? actions.utilization.count : null,
        actionUtilizationNote: actions.utilization.isChecked ? actions.utilization.info : null,
        actionUtilizationDetails: actions.utilization.isChecked ? actions.utilization.extraInfo : null,
        isActionDriveToClient: actions.driveToClient.isChecked ? actions.driveToClient.isChecked : null,
        actionDriveToClientCount: actions.driveToClient.isChecked ? actions.driveToClient.count : null,
        actionDriveToClientNote: actions.driveToClient.isChecked ? actions.driveToClient.info : null,
        actionDriveToClientDetails: actions.driveToClient.isChecked ? actions.driveToClient.extraInfo : null,
        isActionOther: actions.other.isChecked ? actions.other.isChecked : null,
        actionOtherCount: actions.other.isChecked ? actions.other.count : null,
        actionOtherNote: actions.other.isChecked ? actions.other.info : null,
        actionOtherDetails: actions.other.isChecked ? actions.other.extraInfo : null,
        otherMaterials: req.body.otherMaterials,
        isGeometryRecommendation: req.body.recommendations.geometry,
        isShockAbsorbersRecommendation: req.body.recommendations.shockAbsorbers,
        isBrakesRecommendation: req.body.recommendations.brakes,
        nextVisitDate: req.body.nextVisit.date,
        nextVisitDescription: req.body.nextVisit.description,
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
