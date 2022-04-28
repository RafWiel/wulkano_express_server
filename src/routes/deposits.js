const deposits = require('../controllers/deposits');
const clientPolicies = require('../policies/clients')

module.exports = (app) => {
  app.post('/deposits', clientPolicies.create, deposits.create);
  app.get('/deposits/:id', deposits.getOne);
}
