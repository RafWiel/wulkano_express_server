const {TruckService} = require('../models');
const {TruckTire} = require('../models');
const {Company} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const directoriesController = require('./directories');
const tools = require('../misc/tools');
const signature = require('../misc/signature');
const { Op } = require('sequelize');
const tireType = require('../enums/truckTireType');

async function createTires(request, type, array) {
  for (let i = 0; i < array.length; i++) {
    const tire = array[i];

    try {
      await TruckTire.create({
        serviceId: request.id,
        type: type,
        location: tire.location,
        width: tire.width,
        profile: tire.profile,
        diameter: tire.diameter,
        serial: tire.dot,
        brand: tire.brand,
        tread: tire.tread,
        pressure: tire.pressure
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

        isTiresInspection: actions.tiresInspection.isChecked ? actions.tiresInspection.isChecked : null,
        tiresInspectionCount: actions.tiresInspection.isChecked ? actions.tiresInspection.count : null,
        tiresInspectionNote: actions.tiresInspection.isChecked ? actions.tiresInspection.info : null,
        isPressureRegulation: actions.pressureRegulation.isChecked ? actions.pressureRegulation.isChecked : null,
        pressureRegulationCount: actions.pressureRegulation.isChecked ? actions.pressureRegulation.count : null,
        pressureRegulationNote: actions.pressureRegulation.isChecked ? actions.pressureRegulation.info : null,
        isWheelWashing: actions.wheelWashing.isChecked ? actions.wheelWashing.isChecked : null,
        wheelWashingCount: actions.wheelWashing.isChecked ? actions.wheelWashing.count : null,
        wheelWashingNote: actions.wheelWashing.isChecked ? actions.wheelWashing.info : null,
        wheelWashingDetails: actions.wheelWashing.isChecked ? actions.wheelWashing.extraInfo : null,
        isWheelUnscrewing: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.isChecked : null,
        wheelUnscrewingCount: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.count : null,
        wheelUnscrewingNote: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.info : null,
        wheelUnscrewingDetails: actions.wheelUnscrewing.isChecked ? actions.wheelUnscrewing.extraInfo : null,
        isTireInstallation: actions.tireInstallation.isChecked ? actions.tireInstallation.isChecked : null,
        tireInstallationCount: actions.tireInstallation.isChecked ? actions.tireInstallation.count : null,
        tireInstallationNote: actions.tireInstallation.isChecked ? actions.tireInstallation.info : null,
        tireInstallationDetails: actions.tireInstallation.isChecked ? actions.tireInstallation.extraInfo : null,
        isWheelBalancing: actions.wheelBalancing.isChecked ? actions.wheelBalancing.isChecked : null,
        wheelBalancingCount: actions.wheelBalancing.isChecked ? actions.wheelBalancing.count : null,
        wheelBalancingNote: actions.wheelBalancing.isChecked ? actions.wheelBalancing.info : null,
        wheelBalancingDetails: actions.wheelBalancing.isChecked ? actions.wheelBalancing.extraInfo : null,
        isWheelWeights: actions.wheelWeights.isChecked ? actions.wheelWeights.isChecked : null,
        wheelWeightsCount: actions.wheelWeights.isChecked ? actions.wheelWeights.count : null,
        wheelWeightsNote: actions.wheelWeights.isChecked ? actions.wheelWeights.info : null,
        wheelWeightsDetails: actions.wheelWeights.isChecked ? actions.wheelWeights.extraInfo : null,
        isWheelCentering: actions.wheelCentering.isChecked ? actions.wheelCentering.isChecked : null,
        wheelCenteringCount: actions.wheelCentering.isChecked ? actions.wheelCentering.count : null,
        wheelCenteringNote: actions.wheelCentering.isChecked ? actions.wheelCentering.info : null,
        isPinsCleaning: actions.pinsCleaning.isChecked ? actions.pinsCleaning.isChecked : null,
        pinsCleaningCount: actions.pinsCleaning.isChecked ? actions.pinsCleaning.count : null,
        pinsCleaningNote: actions.pinsCleaning.isChecked ? actions.pinsCleaning.info : null,
        isTighteningWithTorqueWrench: actions.tighteningWithTorqueWrench.isChecked ? actions.tighteningWithTorqueWrench.isChecked : null,
        tighteningWithTorqueWrenchCount: actions.tighteningWithTorqueWrench.isChecked ? actions.tighteningWithTorqueWrench.count : null,
        tighteningWithTorqueWrenchNote: actions.tighteningWithTorqueWrench.isChecked ? actions.tighteningWithTorqueWrench.info : null,
        isHandingOverTighteningCard: actions.handingOverTighteningCard.isChecked ? actions.handingOverTighteningCard.isChecked : null,
        handingOverTighteningCardCount: actions.handingOverTighteningCard.isChecked ? actions.handingOverTighteningCard.count : null,
        handingOverTighteningCardNote: actions.handingOverTighteningCard.isChecked ? actions.handingOverTighteningCard.info : null,
        isPumping: actions.pumping.isChecked ? actions.pumping.isChecked : null,
        pumpingCount: actions.pumping.isChecked ? actions.pumping.count : null,
        pumpingNote: actions.pumping.isChecked ? actions.pumping.info : null,
        pumpingDetails: actions.pumping.isChecked ? actions.pumping.extraInfo : null,
        isValveChange: actions.valveChange.isChecked ? actions.valveChange.isChecked : null,
        valveChangeCount: actions.valveChange.isChecked ? actions.valveChange.count : null,
        valveChangeNote: actions.valveChange.isChecked ? actions.valveChange.info : null,
        valveChangeDetails: actions.valveChange.isChecked ? actions.valveChange.extraInfo : null,
        isExtensionInstallation: actions.extensionInstallation.isChecked ? actions.extensionInstallation.isChecked : null,
        extensionInstallationCount: actions.extensionInstallation.isChecked ? actions.extensionInstallation.count : null,
        extensionInstallationNote: actions.extensionInstallation.isChecked ? actions.extensionInstallation.info : null,
        extensionInstallationDetails: actions.extensionInstallation.isChecked ? actions.extensionInstallation.extraInfo : null,
        isDeepening: actions.deepening.isChecked ? actions.deepening.isChecked : null,
        deepeningCount: actions.deepening.isChecked ? actions.deepening.count : null,
        deepeningNote: actions.deepening.isChecked ? actions.deepening.info : null,
        isDeepeningF: actions.deepening.isChecked ? actions.deepening.F : null,
        isDeepeningD: actions.deepening.isChecked ? actions.deepening.D : null,
        isDeepeningT: actions.deepening.isChecked ? actions.deepening.T : null,
        isColdHotRepair: actions.coldHotRepair.isChecked ? actions.coldHotRepair.isChecked : null,
        coldHotRepairCount: actions.coldHotRepair.isChecked ? actions.coldHotRepair.count : null,
        coldHotRepairNote: actions.coldHotRepair.isChecked ? actions.coldHotRepair.info : null,
        coldHotRepairDetails: actions.coldHotRepair.isChecked ? actions.coldHotRepair.extraInfo : null,
        isUtilization: actions.utilization.isChecked ? actions.utilization.isChecked : null,
        utilizationCount: actions.utilization.isChecked ? actions.utilization.count : null,
        utilizationNote: actions.utilization.isChecked ? actions.utilization.info : null,
        utilizationDetails: actions.utilization.isChecked ? actions.utilization.extraInfo : null,
        isDriveToClient: actions.driveToClient.isChecked ? actions.driveToClient.isChecked : null,
        driveToClientCount: actions.driveToClient.isChecked ? actions.driveToClient.count : null,
        driveToClientNote: actions.driveToClient.isChecked ? actions.driveToClient.info : null,
        driveToClientDetails: actions.driveToClient.isChecked ? actions.driveToClient.extraInfo : null,
        isOther: actions.other.isChecked ? actions.other.isChecked : null,
        otherCount: actions.other.isChecked ? actions.other.count : null,
        otherNote: actions.other.isChecked ? actions.other.info : null,
        otherDetails: actions.other.isChecked ? actions.other.extraInfo : null,
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

        if (sizeTiresResult === true && installedTiresResult === true && dismantledTiresResult === true) {
          res.send({
            result: true,
            serviceId: item.id,
          });
        }
        else {
          if (sizeTiresResult !== true) tools.sendError(res, sizeTiresResult);
          if (installedTiresResult !== true) tools.sendError(res, installedTiresResult);
          if (dismantledTiresResult !== true) tools.sendError(res, dismantledTiresResult);
        }
      })
      .catch((error) => tools.sendError(res, error));
    }
    catch (error) {
      tools.sendError(res, error);
    }
  },
  // async getOne (req, res) {
  //   try {
  //     //get deposit
  //     const deposits = await sequelize.query(`
  //       select *
  //       from Deposits
  //       where id = :id
  //     `, {
  //       type: QueryTypes.SELECT,
  //       replacements: { id: req.params.id },
  //     });

  //     const [deposit] = deposits;

  //     //get client
  //     deposit.client = await Client.findOne({
  //       where : { id: deposit.clientId },
  //     });

  //     // get tires
  //     deposit.tires = await DepositTire.findAll({
  //       where : { depositId: deposit.id },
  //     })


  //     res.send({ deposit });
  //   } catch (error) {
  //     tools.sendError(res, error);
  //   }
  // },
}
