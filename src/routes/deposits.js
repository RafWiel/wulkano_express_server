const deposits = require('../controllers/deposits');
const clientPolicies = require('../policies/clients')

module.exports = (app) => {
  app.post('/deposit', clientPolicies.create, deposits.create);

}
