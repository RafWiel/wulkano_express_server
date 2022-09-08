const authorization = require('../controllers/authorization');
const policy = require('../policies/users');

module.exports = (app) => {
  app.post('/register', policy.create, authorization.register);
  app.post('/login', authorization.login);
}
