const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url).then(() => {
    console.log("successfully connected to the db");
  })
}

module.exports = connectDB;