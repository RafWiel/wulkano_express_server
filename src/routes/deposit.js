const deposit = require('../controllers/deposit');

module.exports = (app) => {
  app.post('/deposit', deposit.create);

}
