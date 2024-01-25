//
const ProductsModel = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({ price: { $gt: 30 } })
    .select('price')
    .sort('price')
    .limit(10);
  res.status(200).json({ nbHits: products.length, products });
  console.log(req.params);
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    console.log(filters);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
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
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //so, we have 23 products but we limit response to 7 items per page
  // 23/7 = 4 pages > 7 7 7 4
  // so on page 1: (0 - 0 ) * 7 = 0, so no skips, but limit 7 since chained after skip
  // so on page 2: (2-1)*7 = 7 we we skip 7 from list, then display from there but still limit 7
  //so page 3: (3-2) and so on

  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
