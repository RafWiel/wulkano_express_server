const carServices = require('../controllers/carServices');
const clientPolicies = require('../policies/clients')

module.exports = (app) => {
  app.post('/service/cars', clientPolicies.create, carServices.create);
  app.get('/service/cars/:id', carServices.getOne);
}
