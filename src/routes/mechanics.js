const mechanics = require('../controllers/mechanics');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = (app) => {
  app.get('/mechanics/names', authorizationMiddleware.filter, mechanics.getNames);
}
