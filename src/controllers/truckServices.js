const {TruckService} = require('../models');
const {Client} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const directoriesController = require('./directories');
const tools = require('../misc/tools');
const signature = require('../misc/signature');
const { Op } = require('sequelize');

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
      let ordinal = await TruckService.max('ordinal', {
        where : {'date': {[Op.gte]: dateStartMonth }}
      });
      ordinal = ordinal === null ? 1 : ordinal + 1;

      TruckService.create({
        date: now,
        ordinal: ordinal,
        requestName: `D/${ordinal}/${now.getMonth() + 1}/${now.getFullYear().toString().substr(-2)}`,
        clientId: client.id,
        visitDescription: req.body.visitDescription,
        vehicleName: req.body.vehicleName,
        registrationNumber: req.body.registrationNumber,
        vehicleType: req.body.vehicleType,
        mileage: req.body.mileage,
        tireDiagnostics: req.body.tireDiagnostics,
        isTiresInspection: req.body.actions.tiresInspection.isChecked,
        tiresInspectionCount: req.body.actions.tiresInspection.count,
        tiresInspectionNote: req.body.actions.tiresInspection.info,
        isPressureRegulation: req.body.actions.pressureRegulation.isChecked,
        pressureRegulationCount: req.body.actions.pressureRegulation.count,
        pressureRegulationNote: req.body.actions.pressureRegulation.info,
        isWheelWashing: req.body.actions.wheelWashing.isChecked,
        wheelWashingCount: req.body.actions.wheelWashing.count,
        wheelWashingNote: req.body.actions.wheelWashing.info,
        wheelWashingDetails: req.body.actions.wheelWashing.extraInfo,
        isWheelUnscrewing: req.body.actions.wheelUnscrewing.isChecked,
        wheelUnscrewingCount: req.body.actions.wheelUnscrewing.count,
        wheelUnscrewingNote: req.body.actions.wheelUnscrewing.info,
        wheelUnscrewingDetails: req.body.actions.wheelUnscrewing.extraInfo,
        isTireInstallation: req.body.actions.tireInstallation.isChecked,
        tireInstallationCount: req.body.actions.tireInstallation.count,
        tireInstallationNote: req.body.actions.tireInstallation.info,
        tireInstallationDetails: req.body.actions.tireInstallation.extraInfo,
        isWheelBalancing: req.body.actions.wheelBalancing.isChecked,
        wheelBalancingCount: req.body.actions.wheelBalancing.count,
        wheelBalancingNote: req.body.actions.wheelBalancing.info,
        wheelBalancingDetails: req.body.actions.wheelBalancing.extraInfo,
        isWheelWeights: req.body.actions.wheelWeights.isChecked,
        wheelWeightsCount: req.body.actions.wheelWeights.count,
        wheelWeightsNote: req.body.actions.wheelWeights.info,
        wheelWeightsDetails: req.body.actions.wheelWeights.extraInfo,
        isWheelCentering: req.body.actions.wheelCentering.isChecked,
        wheelCenteringCount: req.body.actions.wheelCentering.count,
        wheelCenteringNote: req.body.actions.wheelCentering.info,
        isPinsCleaning: req.body.actions.pinsCleaning.isChecked,
        pinsCleaningCount: req.body.actions.pinsCleaning.count,
        pinsCleaningNote: req.body.actions.pinsCleaning.info,
        isTighteningWithTorqueWrench: req.body.actions.tighteningWithTorqueWrench.isChecked,
        tighteningWithTorqueWrenchCount: req.body.actions.tighteningWithTorqueWrench.count,
        tighteningWithTorqueWrenchNote: req.body.actions.tighteningWithTorqueWrench.info,
        isHandingOverTighteningCard: req.body.actions.handingOverTighteningCard.isChecked,
        handingOverTighteningCardCount: req.body.actions.handingOverTighteningCard.count,
        handingOverTighteningCardNote: req.body.actions.handingOverTighteningCard.info,
        isPumping: req.body.actions.pumping.isChecked,
        pumpingCount: req.body.actions.pumping.count,
        pumpingNote: req.body.actions.pumping.info,
        pumpingDetails: req.body.actions.pumping.extraInfo,
        isValveChange: req.body.actions.valveChange.isChecked,
        valveChangeCount: req.body.actions.valveChange.count,
        valveChangeNote: req.body.actions.valveChange.info,
        valveChangeDetails: req.body.actions.valveChange.extraInfo,
        isExtensionInstallation: req.body.actions.extensionInstallation.isChecked,
        extensionInstallationCount: req.body.actions.extensionInstallation.count,
        extensionInstallationNote: req.body.actions.extensionInstallation.info,
        extensionInstallationDetails: req.body.actions.extensionInstallation.extraInfo,
        isDeepening: req.body.actions.deepening.isChecked,
        deepeningCount: req.body.actions.deepening.count,
        deepeningNote: req.body.actions.deepening.info,
        isDeepeningF: req.body.actions.deepening.F,
        isDeepeningD: req.body.actions.deepening.D,
        isDeepeningT: req.body.actions.deepening.T,
        isColdHotRepair: req.body.actions.coldHotRepair.isChecked,
        coldHotRepairCount: req.body.actions.coldHotRepair.count,
        coldHotRepairNote: req.body.actions.coldHotRepair.info,
        coldHotRepairDetails: req.body.actions.coldHotRepair.extraInfo,
        isUtilization: req.body.actions.utilization.isChecked,
        utilizationCount: req.body.actions.utilization.count,
        utilizationNote: req.body.actions.utilization.info,
        utilizationDetails: req.body.actions.utilization.extraInfo,
        isDriveToClient: req.body.actions.driveToClient.isChecked,
        driveToClientCount: req.body.actions.driveToClient.count,
        driveToClientNote: req.body.actions.driveToClient.info,
        driveToClientDetails: req.body.actions.driveToClient.extraInfo,
        isOther: req.body.actions.other.isChecked,
        otherCount: req.body.actions.other.count,
        otherNote: req.body.actions.other.info,
        otherDetails: req.body.actions.other.extraInfo,
        otherMaterials: req.body.otherMaterials,
        isGeometryRecommendation: req.body.isGeometryRecommendation,
        isShockAbsorbersRecommendation: req.body.isShockAbsorbersRecommendation,
        isBrakesRecommendation: req.body.isBrakesRecommendation,
        nextVisitDate: req.body.nextVisitDate,
        nextVisitDescription: req.body.nextVisitDescription,
        directoryId: directory.id,
        employeeSignatureFileName: employeeSignatureFileName,
        clientSignatureFileName: clientSignatureFileName,
      })
      .then((item) => {
        //add tires
        // req.body.tires.filter(u => u.width && u.profile && u.diameter).forEach((tire) => {
        //   DepositTire.create({
        //     depositId: item.id,
        //     width: tire.width,
        //     profile: tire.profile,
        //     diameter: tire.diameter,
        //     dot: tire.dot,
        //     brand: tire.brand,
        //     tread: tire.tread,
        //     note: tire.note,
        //   })
        //   .catch((error) => tools.sendError(res, error));
        // });

        res.send({
          result: true,
          serviceId: item.id,
        })
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
