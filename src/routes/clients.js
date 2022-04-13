const clients = require('../controllers/clients');

module.exports = (app) => {
  app.get('/client/phone-numbers', clients.getPhoneNumbers);
}
