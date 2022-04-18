const signatures = require('../controllers/signatures');

module.exports = (app) => {
  app.get('/signatures', signatures.get);

}
