const authorization = require('../controllers/authorization');

module.exports = (app) => {
  app.post('/login', authorization.login);
}
