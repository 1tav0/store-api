require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const products = require('./products.json');

const start = async (req, res) => {
  try {
    await connectDB(process.env.MongoURI);
    await Product.deleteMany();
    await Product.create(products);
    console.log("successfully populated db");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();