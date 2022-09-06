const Joi = require('joi');
const authorizationMiddleware = require('../middlewares/authorization');

module.exports = {
  create (req, res, next) {
    authorizationMiddleware.filter(req, res, next);

    const schema = Joi.object({
      name: Joi.string(),
      companyName: Joi.string().allow(null, ''),
      phoneNumber: Joi.string().pattern(
        //eslint-disable-next-line
        new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/)
      ),
      email: Joi.string().email().allow(null, ''),
    });

    const {error} = schema.validate(req.body.client);
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            message: 'Nieprawidłowy adres e-mail'
          })
          break;
        case 'phoneNumber':
          res.status(400).send({
            message: 'Nieprawidłowy numer telefonu'
          })
        break;
        default:
          res.status(400).send({
            message: 'Nieprawidłowe dane klienta',
            details: error.details[0].message
          })
      }
    }
    else {
      next();
    }
  },
}
