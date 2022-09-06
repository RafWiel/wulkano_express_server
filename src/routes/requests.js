const requests = require('../controllers/requests');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.get('/requests', authorizationMiddleware.filter, requests.get);
}
