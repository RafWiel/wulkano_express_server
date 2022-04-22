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

        isChecked: false,
        text: 'Mycie koła',
        count: '',
        info: '',
        extraInfo: '',

        isTiresInspection: req.body.actions.tiresInspection,
        tiresInspectionCount: req.body.actions.tiresInspection,
        tiresInspectionNote: req.body.actions.tiresInspection,

        isPressureRegulation: req.body.actions.pressureRegulation,
        pressureRegulationCount: req.body.actions.pressureRegulation,
        pressureRegulationNote: req.body.actions.pressureRegulation,

        isWheelWashing: req.body.actions.wheelWashing,
        wheelWashingCount: req.body.actions.wheelWashing,
        wheelWashingNote: req.body.actions.wheelWashing,
        wheelWashingDetails: req.body.actions.wheelWashing,

        isWheelUnscrewing: req.body.actions.wheelUnscrewing,
        wheelUnscrewingCount: req.body.actions.wheelUnscrewing,
        wheelUnscrewingNote: req.body.actions.wheelUnscrewing,
        wheelUnscrewingDetails: req.body.actions.wheelUnscrewing,

        isTireInstallation: req.body.actions.tireInstallation,
        tireInstallationCount: req.body.actions.tireInstallation,
        tireInstallationNote: req.body.actions.tireInstallation,
        tireInstallationDetails: req.body.actions.tireInstallation,

        isWheelBalancing: req.body.actions.wheelBalancing,
        wheelBalancingCount: req.body.actions.wheelBalancing,
        wheelBalancingNote: req.body.actions.wheelBalancing,
        wheelBalancingDetails: req.body.actions.wheelBalancing,

        isWheelWeights: req.body.actions.wheelWeights,
        wheelWeightsCount: req.body.actions.wheelWeights,
        wheelWeightsNote: req.body.actions.wheelWeights,
        wheelWeightsDetails: req.body.actions.wheelWeights,

        isWheelCentering: req.body.actions.wheelCentering,
        wheelCenteringCount: req.body.actions.wheelCentering,
        wheelCenteringNote: req.body.actions.wheelCentering,

        isPinsCleaning: req.body.actions.pinsCleaning,
        pinsCleaningCount: req.body.actions.pinsCleaning,
        pinsCleaningNote: req.body.actions.pinsCleaning,

        isTighteningWithTorqueWrench: req.body.actions.tighteningWithTorqueWrench,
        tighteningWithTorqueWrenchCount: req.body.actions.tighteningWithTorqueWrench,
        tighteningWithTorqueWrenchNote: req.body.actions.tighteningWithTorqueWrench,

        isHandingOverTighteningCard: req.body.actions.handingOverTighteningCard,
        handingOverTighteningCardCount: req.body.actions.handingOverTighteningCard,
        handingOverTighteningCardNote: req.body.actions.handingOverTighteningCard,

        isPumping: req.body.actions.pumping,
        pumpingCount: req.body.actions.pumping,
        pumpingNote: req.body.actions.pumping,
        pumpingDetails: req.body.actions.pumping,

        isValveChange: req.body.actions.valveChange,
        valveChangeCount: req.body.actions.valveChange,
        valveChangeNote: req.body.actions.valveChange,
        valveChangeDetails: req.body.actions.valveChange,

        isExtensionInstallation: req.body.actions.extensionInstallation,
        extensionInstallationCount: req.body.actions.extensionInstallation,
        extensionInstallationNote: req.body.actions.extensionInstallation,
        extensionInstallationDetails: req.body.actions.extensionInstallation,

        isDeepening: req.body.actions.deepening,
        deepeningCount: req.body.actions.deepening,
        deepeningNote: req.body.actions.deepening,
        isDeepeningF: req.body.actions.deepening,
        isDeepeningD: req.body.actions.deepening,
        isDeepeningT: req.body.actions.deepening,

        isColdHotRepair: req.body.actions.coldHotRepair,
        coldHotRepairCount: req.body.actions.coldHotRepair,
        coldHotRepairNote: req.body.actions.coldHotRepair,
        coldHotRepairDetails: req.body.actions.coldHotRepair,

        isUtilization: req.body.actions.utilization,
        utilizationCount: req.body.actions.utilization,
        utilizationNote: req.body.actions.utilization,
        utilizationDetails: req.body.actions.utilization,

        isDriveToClient: req.body.actions.driveToClient,
        driveToClientCount: req.body.actions.driveToClient,
        driveToClientNote: req.body.actions.driveToClient,
        driveToClientDetails: req.body.actions.driveToClient,

        isOther: req.body.actions.other,
        otherCount: req.body.actions.other,
        otherNote: req.body.actions.other,
        otherDetails: req.body.actions.other,



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
