const tools = require('../misc/tools');
const {Client} = require('../models');
const { Op } = require('sequelize');

function getFirstByName (req, res) {
  Client.findOne({
    where: { name: req.query.name }
  })
  .then((item) => sendClient(res, item))
  .catch((error) => tools.sendError(res, error));
}

function getFirstByCompanyName (req, res) {
  Client.findOne({
    where: { companyName: req.query['company-name'] }
  })
  .then((item) => sendClient(res, item))
  .catch((error) => tools.sendError(res, error));
}

function getFirstByPhoneNumber (req, res) {
  Client.findOne({
    where: { phoneNumber: req.query['phone-number'] }
  })
  .then((item) => sendClient(res, item))
  .catch((error) => tools.sendError(res, error));
}

function sendClient (res, item) {
  if (!item) {
    res.send({ result: false });
    return;
  }

  res.send({
    id: item.id,
    name: item.name,
    companyName: item.companyName,
    phoneNumber: item.phoneNumber,
  });
}

module.exports = {
  getNames (req, res) {
    Client.findAll({
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
  getCompanyNames (req, res) {
    Client.findAll({
      attributes: ['companyName'],
      where: {
        companyName: {
          [Op.like]: `%${req.query.filter}%`
        }
      }
    })
    .then((values) => res.send(values.map(u => u.companyName)))
    .catch((error) => tools.sendError(res, error));
  },
  getPhoneNumbers (req, res) {
    Client.findAll({
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
  getFirst (req, res) {
    if (req.query.name) return getFirstByName(req, res);
    if (req.query['company-name']) return getFirstByCompanyName(req, res);
    if (req.query['phone-number']) return getFirstByPhoneNumber(req, res);

    res.send({ result: false });
  },
}
