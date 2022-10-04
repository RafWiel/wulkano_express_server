const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const tools = require('../misc/tools');
const {Client} = require('../models');

module.exports = {
  getPhoneNumbers (req, res) {
    sequelize.query(`
      select
        phoneNumber
      from Clients
      where phoneNumber like :filter
    `, {
      type: QueryTypes.SELECT,
      replacements: { filter: `%${req.query.filter}%` },
    })
    .then((values) => res.send(values.map(u => u.phoneNumber)))
    .catch((error) => tools.sendError(res, error));
  },
  getFirstByPhoneNumber (req, res) {
    console.log('query', req.query);
    Client.findOne({
      where: { phoneNumber: `${req.query['phone-number']}` }
    })
    .then((item) => {
      if (!item) {
        res.send({ result: false });
        return;
      }

      res.send({
        name: item.name,
        companyName: item.companyName,
      });
    })
    .catch((error) => tools.sendError(res, error));
  },
}
