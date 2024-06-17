const errorHandler = (err, req, res, next) => {
  console.log("error =>>>", err);
  return res.status(err.status).send({ error: { message: err.message } });
};

module.exports = errorHandler;
