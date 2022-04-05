const client = require('../controllers/client');

module.exports = (app) => {
  app.get('/client/phone-numbers', client.getPhoneNumbers);
}
