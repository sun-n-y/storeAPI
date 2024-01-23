//
const ProductsModel = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({}).sort('-name price');
  res.status(200).json({ nbHits: products.length, products });
  console.log(req.params);
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  console.log(req.query);
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObject);

  let result = ProductsModel.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result.sort(sortList);
  } else {
    result.sort('createdAt');
  }
  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
