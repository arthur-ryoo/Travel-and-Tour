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
  const total = await Product.countDocuments({});
  const totalPages = await Math.ceil((total / req.query.limit) * 1);

  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .paginate();
    const products = await features.query;
    res.status(200).json({
      success: true,
      results: products.length,
      products,
      totalPages,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      err,
    });
  }
}

module.exports = {
  uploadImage,
  uploadProduct,
  getAllProducts,
};
