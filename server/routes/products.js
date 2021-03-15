const router = require('express').Router();
const productsController = require('../controllers/products');

router.post('/image/new', productsController.uploadImage);
router.post('/new', productsController.uploadProduct);
router.get('/', productsController.getAllProducts);

module.exports = router;
