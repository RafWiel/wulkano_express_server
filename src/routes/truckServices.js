const truckServices = require('../controllers/truckServices');
const clientPolicies = require('../policies/clients')
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.post('/service/trucks', authorizationMiddleware.filter, clientPolicies.create, truckServices.create);
  app.put('/service/trucks', authorizationMiddleware.filter, truckServices.update);
  app.get('/service/trucks/:id', authorizationMiddleware.filter, truckServices.getOne);
}
