//const {Deposit} = require('../models');
const {Client} = require('../models');
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const tools = require('../misc/tools');

module.exports = {
  async create (req, res) {
    console.log(req.body);

    try {
      const {name, companyName, phoneNumber, email} = req.body.client;

      //find client
      var clients = await sequelize.query(`
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

      var [client] = clients;

      // create client
      if (client === undefined) {
        client = await Client.create({
          name,
          companyName,
          phoneNumber,
          email,
        });
      }

      res.send({
        client: {
          id: client.id
        },
      });

      //tutaj depozyt
      // Deposit.create({
      //   clientId: client.id,
      //   tiresNote: req.body.tiresNote,
      // })
      // .then((item) => res.send({
      //   result: true,
      //   depositId: item.id,
      // }))
      // .catch((error) => tools.sendError(res, error));
    }
    catch (error) {
      tools.sendError(res, error);
    }
  },
}
