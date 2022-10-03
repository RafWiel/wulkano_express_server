const {CarService} = require('../models');
const {CarTire} = require('../models');
const {Client} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const directoriesController = require('./directories');
const tools = require('../misc/tools');
const signature = require('../misc/signature');
const { Op } = require('sequelize');
const tireType = require('../enums/carTireType');

async function createTires(request, type, array) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    try {
      await CarTire.create({
        serviceId: request.id,
        type: type,
        location: item.location,
        status: item.status,
        width: item.width,
        profile: item.profile,
        diameter: item.diameter,
        dot: item.dot,
        serial: item.serial,
        brand: item.brand,
        tread: item.tread,
        pressure: item.pressure,
        note: item.note
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
        isDepositTires: deposit.isTires,
        isDepositAlloys: deposit.isAlloys,
        isDepositSteels: deposit.isSteels,
        isDepositScrews: deposit.isScrews,
        isDepositHubcups: deposit.isHubcups,
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
        //add inspected tires
        const inspectedTiresResult = await createTires(item, tireType.inspected, req.body.inspectedTires.filter(u => u.location));

        //add installed tires
        const installedTiresResult = await createTires(item, tireType.installed, req.body.installedTires.filter(u => u.width && u.profile && u.diameter));

        //add deposit tires
        const depositTiresResult = await createTires(item, tireType.deposit, req.body.depositTires.filter(u => u.width && u.profile && u.diameter));

        if (inspectedTiresResult === true
          && installedTiresResult === true
          && depositTiresResult === true) {
          res.send({
            result: true,
            serviceId: item.id,
          });
        }
        else {
          if (inspectedTiresResult !== true) {
            tools.sendError(res, inspectedTiresResult);
            return;
          }

          if (installedTiresResult !== true) {
            tools.sendError(res, installedTiresResult);
            return;
          }

          if (depositTiresResult !== true) {
            tools.sendError(res, depositTiresResult);
            return;
          }
        }
      })
      .catch((error) => tools.sendError(res, error));
    }
    catch (error) {
      tools.sendError(res, error);
    }
  },
  async update (req, res) {
    try {
      console.log(req.body);

      const {id, saleDocument} = req.body;

      CarService.update(
        { saleDocument: saleDocument },
        { where: { id: id } }
      )
      .then((result) => {
        res.send({
          result: Boolean(result)
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
        from CarServices
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
        clientId: item.clientId,
        description: item.visitDescription,
        vehicle: {
          name: item.vehicleName,
          registrationNumber: item.registrationNumber,
          type: item.vehicleType,
          mileage: item.mileage,
        },
        incorrectTireWearLocation: item.incorrectTireWearLocation,
        isGeometryRequired: item.isGeometryRequired,
        tireChange: item.tireChange,
        deposit: {
          isTires: item.isDepositTires,
          isAlloys: item.isDepositAlloys,
          isSteels: item.isDepositSteels,
          isScrews: item.isDepositScrews,
          isHubcups: item.isDepositHubcups,
        },
        depositTiresNote: item.depositTiresNote,
        depositTiresLocation: item.depositTiresLocation,
        visualInspection: {
          brakePads: {
            front: {
              status: item.visualInspectionBrakePadsFront,
            },
            rear: {
              status: item.visualInspectionBrakePadsRear,
            },
          },
          brakeDiscs: {
            front: {
              status: item.visualInspectionBrakeDiscsFront,
            },
            rear: {
              status: item.visualInspectionBrakeDiscsRear,
            },
          },
          shockAbsorbers: {
            status: item.visualInspectionShockAbsorbers,
          },
          suspension: {
            status: item.visualInspectionSuspension,
          },
          airco: {
            status: item.visualInspectionAirco,
          },
          oil: {
            status: item.visualInspectionOil,
          },
          lights: {
            status: item.visualInspectionLights,
          },
          washingFluid: {
            status: item.visualInspectionWashingFluid,
          },
          brakeFluid: {
            status: item.visualInspectionBrakeFluid,
          },
          coolingFluid: {
            status: item.visualInspectionCoolingFluid,
          },
          wipers: {
            status: item.visualInspectionWipers,
          },
          other: {
            status: item.visualInspectionOther,
            extraInfo: item.visualInspectionOtherDetails,
          },
        },
        actions: {
          screwing: {
            isChecked: item.isActionScrewing,
            count: item.actionScrewingCount,
            price: item.actionScrewingPrice,
          },
          installation: {
            isChecked: item.isActionInstallation,
            count: item.actionInstallationCount,
            price: item.actionInstallationPrice,
          },
          wheelBalancing: {
            isChecked: item.isActionWheelBalancing,
            count: item.actionWheelBalancingCount,
            price: item.actionWheelBalancingPrice,
            isSteel: item.isActionWheelBalancingSteel,
            isAlloy: item.isActionWheelBalancingAlloy,
          },
          tireRepair: {
            isChecked: item.isActionTireRepair,
            count: item.actionTireRepairCount,
            price: item.actionTireRepairPrice,
          },
          rimStraightening: {
            isChecked: item.isActionRimStraightening,
            count: item.actionRimStraighteningCount,
            price: item.actionRimStraighteningPrice,
            isSteel: item.isActionRimStraighteningSteel,
            isAlloy: item.isActionRimStraighteningAlloy,
          },
          airValve: {
            isChecked: item.isActionAirValve,
            count: item.actionAirValveCount,
            price: item.actionAirValvePrice,
            extraInfo: item.actionAirValveDetails,
          },
          nitrogenFill: {
            isChecked: item.isActionNitrogenFill,
            count: item.actionNitrogenFillCount,
            price: item.actionNitrogenFillPrice,
          },
          utilization: {
            isChecked: item.isActionUtilization,
            count: item.actionUtilizationCount,
            price: item.actionUtilizationPrice,
          },
        },
        fastFit: {
          brakePads: {
            isChecked: item.isFastFitBrakePads,
            count: item.fastFitBrakePadsCount,
            price: item.fastFitBrakePadsPrice,
            isFront: item.isFastFitBrakePadsFront,
            isRear: item.isFastFitBrakePadsRear,
          },
          brakeDiscs: {
            isChecked: item.isFastFitBrakeDiscs,
            count: item.fastFitBrakeDiscsCount,
            price: item.fastFitBrakeDiscsPrice,
            isFront: item.isFastFitBrakeDiscsFront,
            isRear: item.isFastFitBrakeDiscsRear,
          },
          shockAbsorbers: {
            isChecked: item.isFastFitShockAbsorbers,
            count: item.fastFitShockAbsorbersCount,
            price: item.fastFitShockAbsorbersPrice,
            isFront: item.isFastFitShockAbsorbersFront,
            isRear: item.isFastFitShockAbsorbersRear,
          },
          geometry: {
            isChecked: item.isFastFitGeometry,
            count: item.fastFitGeometryCount,
            price: item.fastFitGeometryPrice,
          },
          fuelFilter: {
            isChecked: item.isFastFitFuelFilter,
            count: item.fastFitFuelFilterCount,
            price: item.fastFitFuelFilterPrice,
          },
        },
        inspection: {
          oil: {
            isChecked: item.isInspectionOilChange,
            count: item.inspectionOilChangeCount,
            price: item.inspectionOilChangePrice,
          },
          oilFilter: {
            isChecked: item.isInspectionOilFilterChange,
            count: item.inspectionOilFilterChangeCount,
            price: item.inspectionOilFilterChangePrice,
          },
          airFilter: {
            isChecked: item.isInspectionAirFilterChange,
            count: item.inspectionAirFilterChangeCount,
            price: item.inspectionAirFilterChangePrice,
          },
          interiorFilter: {
            isChecked: item.isInspectionInteriorFilterChange,
            count: item.inspectionInteriorFilterChangeCount,
            price: item.inspectionInteriorFilterChangePrice,
          },
          airco: {
            isChecked: item.isInspectionAirco,
            count: item.inspectionAircoCount,
            price: item.inspectionAircoPrice,
            isCleaning: item.isInspectionAircoCleaning,
            isFilter: item.isInspectionAircoFilter,
            isFilling: item.isInspectionAircoFilling,
          },
          other: {
            isChecked: item.isInspectionOther,
            count: item.inspectionOtherCount,
            price: item.inspectionOtherPrice,
            extraInfo: item.inspectionOtherDetails,
          },
        },
        directoryId: item.directoryId,
        employeeSignatureFileName: item.employeeSignatureFileName,
        clientSignatureFileName: item.clientSignatureFileName,
      }));

      //get company
      item.client = await Client.findOne({
        where : { id: item.clientId },
      });

      // get inspected tires
      item.inspectedTires = await CarTire.findAll({
        attributes: [ 'location', 'status', 'tread', 'pressure' ],
        where : {
          serviceId: item.id,
          type: tireType.inspected,
       },
      });

      // get installed tires
      item.installedTires = await CarTire.findAll({
        attributes: [ 'location', 'width', 'profile', 'diameter', 'dot', 'brand', 'serial' ],
        where : {
          serviceId: item.id,
          type: tireType.installed,
       },
      });

      // get dismantled tires
      item.depositTires = await CarTire.findAll({
        attributes: [ 'width', 'profile', 'diameter', 'dot', 'brand', 'tread', 'note' ],
        where : {
          serviceId: item.id,
          type: tireType.deposit,
       },
      });

      res.send({ item });
    } catch (error) {
      tools.sendError(res, error);
    }
  },
}
