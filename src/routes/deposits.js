const deposits = require('../controllers/deposits');
const clientPolicies = require('../policies/clients')

module.exports = (app) => {
  app.post('/deposits', clientPolicies.create, deposits.create);
  app.get('/requests/:id', deposits.getOne);
}
