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

  if (type === 'array') {
    let id = req.params.id.split(',');
    productId = id;
  }

  Product.find({ _id: { $in: productId } })
    .populate('userId')
    .exec((err, productInfo) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(productInfo);
    });
}

async function editProduct(req, res) {
  try {
    const productInfo = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate('userId');
    res.status(200).json({
      success: true,
      productInfo,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const productInfo = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      productInfo: null,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err,
    });
  }
}

function countProductView(req, res) {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $inc: { views: 1 },
    },
    { new: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200);
    }
  );
}

module.exports = {
  uploadImage,
  uploadProduct,
  getAllProducts,
  getProduct,
  editProduct,
  deleteProduct,
  countProductView,
};
