const {Deposit} = require('../models');
const {DepositTire} = require('../models');
const {Client} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const directoryController = require('../controllers/directory');
const tools = require('../misc/tools');
const signature = require('../misc/signature');

module.exports = {
  async create (req, res) {
    try {
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
      const directory = await directoryController.getDirectory();

      const employeeSignatureFileName = signature.save(req.body.signature.employee, directory, res);
      const clientSignatureFileName = signature.save(req.body.signature.client, directory, res);

      Deposit.create({
        clientId: client.id,
        tiresNote: req.body.tiresNote,
        tiresLocation: req.body.tiresLocation,
        directoryId: directory.id,
        employeeSigntaureFileName: employeeSignatureFileName,
        clientSigntaureFileName: clientSignatureFileName,
      })
      .then((item) => {
        //add tires
        req.body.tires.filter(u => u.width && u.profile && u.diameter).forEach((tire) => {
          DepositTire.create({
            depositId: item.id,
            width: tire.width,
            profile: tire.profile,
            diameter: tire.diameter,
            dot: tire.dot,
            brand: tire.brand,
            tread: tire.tread,
            note: tire.note,
            tire: tire.tire,
            alloy: tire.alloy,
            steel: tire.steel,
            screws: tire.screws,
            hubcubs: tire.hubcubs
          })
          .catch((error) => tools.sendError(res, error));
        });

        res.send({
          result: true,
          depositId: item.id,
        })
      })
      .catch((error) => tools.sendError(res, error));
    }
    catch (error) {
      tools.sendError(res, error);
    }
  },
}
