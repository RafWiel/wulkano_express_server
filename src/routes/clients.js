const clients = require('../controllers/clients');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.get('/clients/phone-numbers', authorizationMiddleware.filter, clients.getPhoneNumbers);
}
