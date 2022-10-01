const users = require('../controllers/users');
const policy = require('../policies/users');

module.exports = (app) => {
  app.post('/users/', policy.create, users.create);
  app.post('/users/unique-username', policy.create, users.isUniqueUserName);
}
