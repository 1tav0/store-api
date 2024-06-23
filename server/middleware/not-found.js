const notFound = (req, res) => {
  res.status(404).send('<h1>Oops route does not exist</h1><a href="/">Go back</a>');
}

module.exports = notFound;