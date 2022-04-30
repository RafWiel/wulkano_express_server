const mechanics = require('../controllers/mechanics');

module.exports = (app) => {
  app.get('/mechanics/names', mechanics.getNames);
}
