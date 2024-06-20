const errorHandler = (err, req, res, next) => {
  return res.status(err.status).send({ error: { message: err.message } });
};

module.exports = errorHandler;
