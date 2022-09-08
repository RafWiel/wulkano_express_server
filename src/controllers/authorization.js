const tools = require('../misc/tools');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

module.exports = {
  register (req, res) {
    User.findOne({
      attributes: [ 'id' ],
      where : { userName: req.body.userName }
    })
    .then((id) => {
      if (id === null) {
        User.create({
          userName: req.body.userName,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        })
        .then((user) => {
          res.send({
            result: true,
            user, //todo: usun
          });
        })
        .catch((error) => tools.sendError(res, error));
      }
      else {
        res.status(409).send({ message: `Użytkownik ${req.body.userName} jest już zarejestrowany`});
      }
    })
    .catch((error) => tools.sendError(res, error));
  },
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
}
