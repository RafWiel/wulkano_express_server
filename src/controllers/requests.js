const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models');
const tools = require('../misc/tools');
const requestType = require('../enums/requestType');
const sortOrder = require('../enums/sortOrder');
const timePeriod = require('../enums/timePeriod');
const moment = require('moment');

module.exports = {
  get (req, res) {
    try {
      const page = req.query.page || 1;

      // sorting columns
      const sortColumns = ['date', 'requestName', 'clientName', 'companyName', 'phoneNumber', 'requestType'];
      const sortColumn = req.query['sort-column'] ? sortColumns[req.query['sort-column']] : 'date';
      const order = sortOrder.getSqlKeyword(req.query['sort-order']);

      // set filter date
      let startDate = req.query['start-date'] ? req.query['start-date'] : null;
      let stopDate = req.query['stop-date'] ? req.query['stop-date'] : null;
      const now = new Date();

      // set filter predefined date
      switch(parseInt(req.query['time-period'])) {
        case timePeriod.currentWeek:
          startDate = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
            .subtract(now.getDay() - 1, 'd')
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS Z');
          stopDate = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
            .subtract(now.getDay() - 1, 'd')
            .add(7, 'd')
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS Z');
          break;
        case timePeriod.currentMonth:
          startDate = moment(new Date(now.getFullYear(), now.getMonth(), 1))
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS Z');
          stopDate = moment(new Date(now.getFullYear(), now.getMonth(), 1))
            .add(1, 'M')
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS Z');
          break;
        case timePeriod.previousMonth:
          startDate = moment(new Date(now.getFullYear(), now.getMonth(), 1))
            .add(-1, 'M')
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS Z');
          stopDate = moment(new Date(now.getFullYear(), now.getMonth(), 1))
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS Z');
          break;
        default:
          break;
      }

      // run query
      sequelize.query(`
        select
          concat(:depositType, '_', a.id) as id,
          a.date,
          a.requestName,
          c.name as clientName,
          c.companyName,
          c.phoneNumber,
          :depositType as requestType
        from Deposits a
        left join Clients c on a.clientId = c.id
        where (
          a.requestName like :search or
          c.name like :search or
          c.companyName like :search or
          c.phoneNumber like :search
        )
        and case when :startDate is not null then a.date >= :startDate else true end
        and case when :stopDate is not null then a.date < :stopDate else true end
        and case when :depositType is not null then a.id is not null else a.id is null end

        union

        select
          concat(:truckServiceType, '_', a.id) as id,
          a.date,
          a.requestName,
          '' as clientName,
          c.name as companyName,
          c.phoneNumber,
          :truckServiceType as requestType
        from TruckServices a
        left join Companies c on a.companyId = c.id
        where (
          a.requestName like :search or
          c.name like :search or
          c.phoneNumber like :search
        )
        and case when :startDate is not null then a.date >= :startDate else true end
        and case when :stopDate is not null then a.date < :stopDate else true end
        and case when :truckServiceType is not null then a.id is not null else a.id is null end

        union

        select
          concat(:carServiceType, '_', a.id) as id,
          a.date,
          a.requestName,
          c.name as clientName,
          c.companyName,
          c.phoneNumber,
          :carServiceType as requestType
        from CarServices a
        left join Clients c on a.clientId = c.id
        where (
          a.requestName like :search or
          c.name like :search or
          c.phoneNumber like :search
        )
        and case when :startDate is not null then a.date >= :startDate else true end
        and case when :stopDate is not null then a.date < :stopDate else true end
        and case when :carServiceType is not null then a.id is not null else a.id is null end

        order by ${sortColumn} ${order}
        limit 50
        offset :offset
      `, {
        type: QueryTypes.SELECT,
        replacements: {
          search: req.query.search ? `%${req.query.search}%` : '%%',
          startDate: startDate ? startDate : null,
          stopDate: stopDate ? stopDate : null,
          depositType: !req.query.type
            || parseInt(req.query.type) === requestType.all
            || parseInt(req.query.type) === requestType.deposit ? requestType.deposit : null,
          truckServiceType: !req.query.type
            || parseInt(req.query.type) === requestType.all
            || parseInt(req.query.type) === requestType.truckService ? requestType.truckService : null,
          carServiceType: !req.query.type
            || parseInt(req.query.type) === requestType.all
            || parseInt(req.query.type) === requestType.carService ? requestType.carService : null,
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
