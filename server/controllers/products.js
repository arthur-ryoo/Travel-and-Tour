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

module.exports = {
  uploadImage,
  uploadProduct,
};
