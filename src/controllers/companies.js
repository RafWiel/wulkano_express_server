const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const tools = require('../misc/tools');

module.exports = {
  getPhoneNumbers (req, res) {
    sequelize.query(`
      select
        phoneNumber
      from Companies
      where phoneNumber like :filter
    `, {
      type: QueryTypes.SELECT,
      replacements: { filter: `%${req.query.filter}%` },
    })
    .then((values) => res.send(values.map(u => u.phoneNumber)))
    .catch((error) => tools.sendError(res, error));
  },
  getTaxIdNumbers (req, res) {
    sequelize.query(`
      select
        taxId
      from Companies
      where taxId like :filter
    `, {
      type: QueryTypes.SELECT,
      replacements: { filter: `%${req.query.filter}%` },
    })
    .then((values) => res.send(values.map(u => u.taxId)))
    .catch((error) => tools.sendError(res, error));
  },
}
