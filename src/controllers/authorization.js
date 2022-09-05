const tools = require('../misc/tools');
const jwt = require('jsonwebtoken');

module.exports = {
  login (req, res) {
    //temp
    const users =
    [
      { id: 1, username: 'user' }
    ];

    console.log('login');
    console.log(req.body);
    const {username} = req.body;

    if (!username) {
      return tools.sendAuthorizationError(res);
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return tools.sendAuthorizationError(res);
    }

    const payload = {
      id: user.id,
      username: user.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 * 12 });

    res.send({
      token: token
    });
  },

  test (req, res) {
    res.send({
      text: 'ok'
    });
  },
}
