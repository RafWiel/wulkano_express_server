const serviceRequests = require('../controllers/serviceRequests');

module.exports = (app) => {
  app.get('/service-requests', serviceRequests.get);

}
