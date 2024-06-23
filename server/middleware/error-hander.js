const errorHandler = async (err, req, res, next) => {
  console.log(err);
  return res.status(err.status).send({ msg: 'something went wrong please try again' });
}