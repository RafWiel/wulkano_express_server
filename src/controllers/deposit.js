const {Deposit} = require('../models');
//const {Client} = require('../models');
//const {QueryTypes} = require('sequelize');
//const {sequelize} = require('../models');
const tools = require('../misc/tools');

module.exports = {
  create (req, res) {
    console.log(req.body);

    Deposit.create({
      clientId: 1,
      tiresNote: req.body.tiresNote,
    })
    .then((item) => res.send({
      result: true,
      depositId: item.id,
    }))
    .catch((error) => tools.sendError(res, error));
  },
}
