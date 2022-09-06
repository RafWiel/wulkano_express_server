const signatures = require('../controllers/signatures');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.get('/signatures', authorizationMiddleware.filter, signatures.get);
}
