const { query } = require('express');
const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
  const search = 'a';
  // throw new Error('Testing async errors');
  //const products = await Product.find({}).sort("-name price");
  // const products = await Product.find({})
  //   .sort("name")
  //   .select("name price")
  //   .limit(2)
  //   .skip(2);
  const products = await Product.find({ price: { $gt: 300 } })
    .sort("price")
    .select("name price")
  res.status(200).json({ products, total: products.length });
}
//with sort aka search functionality
const getAllProducts = async (req, res) => {
  const { featured,company,name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };//options case insensitive for search
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq'
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    console.log(filters)
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = {[operator]:Number(value)}
      }
    })
  }

  console.log(queryObject);
  let result = Product.find(queryObject) //bc sort may not always be included we need to do this conditionally aka if loop 
  if (sort) {
    //console.log(typeof (sort), sort); //sort is a string since it can be many filter types
    const sortList = sort.split(',').join(' '); //split it into an array & from this array join them with a space
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23 items
  // want 4 pages so we get pages of 7 7 7 2
  const products = await result;

  res.status(200).json({ products, totalProducts: products.length });
}

module.exports = {
  getAllProducts,
  getAllProductsStatic
}