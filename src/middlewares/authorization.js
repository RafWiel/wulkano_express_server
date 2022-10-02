const tools = require('../misc/tools');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = {
  filter (req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return tools.sendAuthorizationError(res);
    }

    //console.log('Auth token:', token);

    jwt.verify(token, config.authentication.jwtSecret, (error) => {
      if (error) {
        return tools.sendAuthorizationError(res, error);
      }

      next();
    });
  }
}
