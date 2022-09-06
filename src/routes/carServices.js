const carServices = require('../controllers/carServices');
const clientPolicies = require('../policies/clients');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.post('/service/cars', clientPolicies.create, carServices.create);
  app.get('/service/cars/:id', authorizationMiddleware.filter, carServices.getOne);
}
