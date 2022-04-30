const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const tools = require('../misc/tools');

module.exports = {
  getNames (req, res) {
    sequelize.query(`
      select distinct
        name
      from Mechanics
      where name like :filter
    `, {
      type: QueryTypes.SELECT,
      replacements: { filter: `%${req.query.filter}%` },
    })
    .then((values) => res.send(values.map(u => u.name)))
    .catch((error) => tools.sendError(res, error));
  },
}
