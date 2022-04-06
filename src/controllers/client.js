const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const tools = require('../misc/tools');

module.exports = {
  getPhoneNumbers (req, res) {
    console.log(req.query.filter);
    sequelize.query(`
      select
        phoneNumber
      from Clients
      where phoneNumber like :filter
    `, {
      type: QueryTypes.SELECT,
      replacements: { filter: `%${req.query.filter}%` },
    })
    .then((phoneNumbers) => res.send(phoneNumbers.map(u => u.phoneNumber)))
    .catch((error) => tools.sendError(res, error));
  },
}
