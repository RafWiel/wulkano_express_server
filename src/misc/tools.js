const path = require('path');

module.exports = {
  sendError(res, error) {
    console.log(error);
    res.status(500).send({
      message: 'Błąd wewnętrzny serwera'
    });
  },
  sendBadRequestError(res, error) {
    console.log(error);
    res.status(400).send({
      message: 'Nieprawidłowe dane wejściowe'
    });
  },
  sendAuthorizationError(res, error) {
    console.log(error);
    res.status(401).send({
      message: 'Błąd autoryzacji'
    });
  },
  sendLoginError(res, error) {
    console.log(error);
    res.status(401).send({
      message: 'Nieprawidłowy użytkownik lub hasło'
    });
  },
  getDir() {
    if (process.pkg) {
      return path.resolve(process.execPath + '/..');
    } else {
      return path.join(require.main ? require.main.path : process.cwd(), '..');
    }
  }
}
