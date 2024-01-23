//
const ProductsModel = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({ name: 'bar stool' }).exec();
  res.status(200).json({ nbHits: products.length, products });
  console.log(req.params);
};
const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  console.log(queryObject);
  const products = await ProductsModel.find(queryObject).exec();
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
