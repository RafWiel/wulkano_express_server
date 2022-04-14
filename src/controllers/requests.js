const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const tools = require('../misc/tools');
const requestType = require('../enums/requestType');
const sortOrder = require('../enums/sortOrder');

module.exports = {
  get (req, res) {
    try {
      const page = req.query.page || 1;

      console.log('page', page);
      console.log('query', req.query);

      // sorting columns
      const sortColumns = ['a.date', 'a.requestName', 'c.name', 'c.companyName', 'c.phoneNumber', 'requestType'];
      const sortColumn = req.query['sort-column'] ? sortColumns[req.query['sort-column']] : 'a.date';
      const order = sortOrder.getSqlKeyword(req.query['sort-order']);

      // run query
      sequelize.query(`
        select
          a.id,
          a.date,
          a.requestName,
          c.name as clientName,
          c.companyName,
          c.phoneNumber,
          :depositType as requestType
        from Deposits a
        left join Clients c on a.clientId = c.id
        order by ${sortColumn} ${order}
        limit 50
        offset :offset
      `, {
        type: QueryTypes.SELECT,
        replacements: {
          depositType: requestType.deposit,
          offset: 50 * (page - 1),
        },
      })
      .then((requests) => {
        res.send({
          requests,
          meta: {
            page: 1,
          },
        });
      });
    } catch (error) {
      tools.sendError(res, error);
    }
  },
}
