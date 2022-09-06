const companies = require('../controllers/companies');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.get('/companies/phone-numbers', authorizationMiddleware.filter, companies.getPhoneNumbers);
  app.get('/companies/tax-id-numbers', authorizationMiddleware.filter, companies.getTaxIdNumbers);
}
