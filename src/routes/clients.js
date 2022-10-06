const clients = require('../controllers/clients');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.get('/clients/names', authorizationMiddleware.filter, clients.getNames);
  app.get('/clients/company-names', authorizationMiddleware.filter, clients.getCompanyNames);
  app.get('/clients/phone-numbers', authorizationMiddleware.filter, clients.getPhoneNumbers);
  app.get('/clients/first', authorizationMiddleware.filter, clients.getFirst);
}
