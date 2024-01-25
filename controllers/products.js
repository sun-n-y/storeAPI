//
const ProductsModel = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({}).select('name price');
  res.status(200).json({ nbHits: products.length, products });
  console.log(req.params);
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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
  //sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result.sort(sortList);
  } else {
    result.sort('createdAt');
  }
  //fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result.select(fieldsList);
  }
  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
