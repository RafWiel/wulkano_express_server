const {Deposit} = require('../models');
const {DepositTire} = require('../models');
const {Client} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const directoriesController = require('../controllers/directories');
const tools = require('../misc/tools');
const signature = require('../misc/signature');
const { Op } = require('sequelize');

async function createTires(request, array) {
  for (let i = 0; i < array.length; i++) {
    const tire = array[i];

    try {
      await DepositTire.create({
        depositId: request.id,
        width: tire.width,
        profile: tire.profile,
        diameter: tire.diameter,
        dot: tire.dot,
        brand: tire.brand,
        tread: tire.tread,
        note: tire.note,
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
      const { name, companyName, phoneNumber, email } = req.body.client;

      //find client
      let client = await Client.findOne({
        where: {
          name: name,
          companyName: companyName,
          phoneNumber: phoneNumber,
          email: email,
        }
      });

      // create new client
      if (!client) {
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
      let ordinal = await Deposit.max('ordinal', {
        where : {'date': {[Op.gte]: dateStartMonth }}
      });
      ordinal = ordinal === null ? 1 : ordinal + 1;

      Deposit.create({
        date: now,
        ordinal: ordinal,
        requestName: `D/${ordinal}/${now.getMonth() + 1}/${now.getFullYear().toString().substr(-2)}`,
        clientId: client.id,
        isTires: req.body.isTires,
        isAlloys: req.body.isAlloys,
        isSteels: req.body.isSteels,
        isScrews: req.body.isScrews,
        isHubcups: req.body.isHubcups,
        tiresNote: req.body.tiresNote,
        tiresLocation: req.body.tiresLocation,
        directoryId: directory.id,
        employeeSignatureFileName: employeeSignatureFileName,
        clientSignatureFileName: clientSignatureFileName,
      })
      .then(async (item) => {
        //add tires
        const tiresResult = await createTires(item, req.body.tires.filter(u => u.width && u.profile && u.diameter));

        if (tiresResult === true) {
          res.send({
            result: true,
            serviceId: item.id,
          });
        }
        else tools.sendError(res, tiresResult);
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
        from Deposits
        where id = :id
      `, {
        type: QueryTypes.SELECT,
        replacements: { id: req.params.id },
      });

      const [item] = items;

      //get client
      item.client = await Client.findOne({
        where : { id: item.clientId },
      });

      // get tires
      item.tires = await DepositTire.findAll({
        where : { depositId: item.id },
      })

      res.send({ item });
    } catch (error) {
      tools.sendError(res, error);
    }
  },
}
