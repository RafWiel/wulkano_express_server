const tools = require('../misc/tools');
const jwt = require('jsonwebtoken');

module.exports = {
  filter (req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return tools.sendAuthorizationError(res);
    }

    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) {
        return tools.sendAuthorizationError(res, error);
      }

      next();
    });
  }
}
