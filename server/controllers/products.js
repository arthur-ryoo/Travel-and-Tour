const { Product } = require('../models/Product');
const upload = require('../services/file-upload');
const APIFeatures = require('./../utils/apiFeatures');

const singleUpload = upload.single('file');

function uploadImage(req, res) {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: 'File Upload Error', detail: err.message }],
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
}

function uploadProduct(req, res) {
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
}

async function getAllProducts(req, res) {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .search()
      .sort()
      .paginate();
    const products = await features.query.populate('userId');

    const resultSize = new APIFeatures(Product.find(), req.query)
      .filter()
      .search()
      .sort();
    const results = await resultSize.query;

    const total = results.length;
    const totalPages = Math.ceil((total / req.query.limit) * 1);

    res.status(200).json({
      success: true,
      results: total,
      totalPages,
      products,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      err,
    });
  }
}

function getProduct(req, res) {
  let type = req.query.type;
  let productId = req.params.id;

  console.log(productId);

  if (type === 'array') {
    let id = req.params.id.split(',');
    productId = id;
  }

  Product.find({ _id: productId })
    .populate('userId')
    .exec((err, productInfo) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, productInfo });
    });
}

module.exports = {
  uploadImage,
  uploadProduct,
  getAllProducts,
  getProduct,
};
