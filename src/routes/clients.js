const clients = require('../controllers/clients');

module.exports = (app) => {
  app.get('/clients/phone-numbers', clients.getPhoneNumbers);
}
