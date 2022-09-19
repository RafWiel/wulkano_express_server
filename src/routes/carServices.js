const carServices = require('../controllers/carServices');
const clientPolicy = require('../policies/clients');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.post('/service/cars', authorizationMiddleware.filter, clientPolicy.create, carServices.create);
  app.get('/service/cars/:id', authorizationMiddleware.filter, carServices.getOne);
}
