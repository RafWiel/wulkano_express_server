const authorization = require('../controllers/authorization');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.post('/login', authorization.login);
  app.get('/test', authorizationMiddleware.filter, authorization.test);
}
