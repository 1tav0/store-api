require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const products = require('./products.json');

const start = async () => {
  try {
    console.log('Connecting to the database...');
    await connectDB(process.env.MongoURI);
    console.log('Connected to the database');
    
    console.log('Deleting existing products...');
    const deleteResult = await Product.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} products`);

    console.log('Inserting new products...');
    const createResult = await Product.create(products);
    console.log(`Inserted ${createResult.length} products`);

    console.log('Successfully populated db');
    process.exit(0);
  } catch (error) {
    console.error('Error populating db:', error);
    process.exit(1);
  }
}

start();