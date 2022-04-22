const truckServices = require('../controllers/truckServices');
const clientPolicies = require('../policies/clients')

module.exports = (app) => {
  app.post('/truck-services', clientPolicies.create, truckServices.create);
  //app.get('/requests/:id', deposits.getOne);
}
