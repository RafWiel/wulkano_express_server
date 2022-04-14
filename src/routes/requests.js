const requests = require('../controllers/requests');

module.exports = (app) => {
  app.get('/requests', requests.get);

}
