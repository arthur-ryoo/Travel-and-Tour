const { Product } = require('../models/Product');
const upload = require('../services/file-upload');

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
  const pageSize = 4;
  const page = parseInt(req.query.page || '0');
  const total = await Product.countDocuments({});
  const totalPages = await Math.ceil(total / pageSize);
  Product.find()
    .limit(pageSize)
    .skip(pageSize * page)
    .populate('userId')
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        totalPages,
        productInfo,
      });
    });
}

module.exports = {
  uploadImage,
  uploadProduct,
  getAllProducts,
};
