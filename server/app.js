require('dotenv').config();
//to avoid making a asyncWrapper middleware for trycatch we use the express built in package for that
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
// const productsRouter = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');


//middleWare
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

//my base route
// app.use('/api/v1/products', productsRouter);

//products route
app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 3000;
const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MongoURI)
    app.listen(Port, () => {
      console.log(`Server is running in port ${Port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

start();