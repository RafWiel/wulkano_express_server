const truckServices = require('../controllers/truckServices');
const clientPolicies = require('../policies/clients')

module.exports = (app) => {
  app.post('/service/trucks', clientPolicies.create, truckServices.create);
  app.get('/service/trucks/:id', truckServices.getOne);
}
