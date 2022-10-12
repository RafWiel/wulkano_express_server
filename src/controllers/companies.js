const tools = require('../misc/tools');
const {Company} = require('../models');
const { Op } = require('sequelize');

function getFirstByName (req, res) {
  Company.findOne({
    where: { name: req.query.name }
  })
  .then((item) => sendCompany(res, item))
  .catch((error) => tools.sendError(res, error));
}

function getFirstByTaxId (req, res) {
  Company.findOne({
    where: { taxId: req.query['tax-id'] }
  })
  .then((item) => sendCompany(res, item))
  .catch((error) => tools.sendError(res, error));
}

function getFirstByPhoneNumber (req, res) {
  Company.findOne({
    where: { phoneNumber: req.query['phone-number'] }
  })
  .then((item) => sendCompany(res, item))
  .catch((error) => tools.sendError(res, error));
}

function sendCompany (res, item) {
  if (!item) {
    res.send({ result: false });
    return;
  }

  res.send({
    id: item.id,
    name: item.name,
    taxId: item.taxId,
    phoneNumber: item.phoneNumber,
    city: item.city,
  });
}

module.exports = {
  getNames (req, res) {
    Company.findAll({
      attributes: ['name'],
      where: {
        name: {
          [Op.like]: `%${req.query.filter}%`
        }
      }
    })
    .then((values) => res.send(values.map(u => u.name)))
    .catch((error) => tools.sendError(res, error));
  },
  getPhoneNumbers (req, res) {
    Company.findAll({
      attributes: ['phoneNumber'],
      where: {
        phoneNumber: {
          [Op.like]: `%${req.query.filter}%`
        }
      }
    })
    .then((values) => res.send(values.map(u => u.phoneNumber)))
    .catch((error) => tools.sendError(res, error));
  },
  getTaxIdNumbers (req, res) {
    Company.findAll({
      attributes: ['taxId'],
      where: {
        taxId: {
          [Op.like]: `%${req.query.filter}%`
        }
      }
    })
    .then((values) => res.send(values.map(u => u.taxId)))
    .catch((error) => tools.sendError(res, error));
  },
  getFirst (req, res) {
    if (req.query.name) return getFirstByName(req, res);
    if (req.query['tax-id']) return getFirstByTaxId(req, res);
    if (req.query['phone-number']) return getFirstByPhoneNumber(req, res);

    res.send({ result: false });
  },
}
