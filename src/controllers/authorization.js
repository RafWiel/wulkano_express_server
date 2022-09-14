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
  async login (req, res) {
    console.log(req.body);
    const {userName, password} = req.body;

    if (!userName || !password) {
      return tools.sendBadRequestError(res, 'UserName or password missing');
    }

    // verify username
    var user = await User.findOne({
      where: { userName: userName }
    });

    if (!user) {
      return tools.sendLoginError(res, 'UserName not found');
    }

    // verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return tools.sendLoginError(res, 'Invalid password');
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
