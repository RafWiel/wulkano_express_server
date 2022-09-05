module.exports = {
  sendError(res, error) {
    console.log(error);
    res.status(500).send({
      message: 'Błąd wewnętrzny serwera'
    });
  },
  sendAuthorizationError(res, error) {
    console.log(error);
    res.status(401).send({
      message: 'Błąd autoryzacji'
    });
  }
}
