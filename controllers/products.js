//
const ProductsModel = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = 't';

  const products = await ProductsModel.find({
    name: { $regex: search, $options: 'i' },
  }).exec();
  res.status(200).json({ nbHits: products.length, products });
  console.log(req.params);
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
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
  const products = await ProductsModel.find(queryObject).exec();
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
