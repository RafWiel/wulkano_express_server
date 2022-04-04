module.exports = {
  sendError(res, error) {
    console.log(error);
    res.status(500).send({
      message: 'Błąd wewnętrzny serwera'
    });
  }
}
