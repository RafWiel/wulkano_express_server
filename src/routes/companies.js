const companies = require('../controllers/companies');

module.exports = (app) => {
  app.get('/companies/phone-numbers', companies.getPhoneNumbers);
  app.get('/companies/tax-id-numbers', companies.getTaxIdNumbers);
}
