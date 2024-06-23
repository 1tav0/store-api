const errorHandler = async (err, req, res) => {
  console.log(err);
  return res.status(err.status).json({ msg: "something went wrong please try again" });
}

module.exports = errorHandler;