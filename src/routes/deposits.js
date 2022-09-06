const deposits = require('../controllers/deposits');
const clientPolicies = require('../policies/clients');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.post('/deposits', clientPolicies.create, deposits.create);
  app.get('/deposits/:id', authorizationMiddleware.filter, deposits.getOne);
}
