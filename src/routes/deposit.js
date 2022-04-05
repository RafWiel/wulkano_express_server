const deposit = require('../controllers/deposit');
const clientPolicy = require('../policies/client')

module.exports = (app) => {
  app.post('/deposit', clientPolicy.create, deposit.create);

}
