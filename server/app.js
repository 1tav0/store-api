require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-hander');

app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>');
})

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MongoURI);
    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();