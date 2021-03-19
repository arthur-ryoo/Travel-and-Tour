const router = require('express').Router();
const productsController = require('../controllers/products');

router.post('/images', productsController.uploadImage);
router.post('/', productsController.uploadProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);
module.exports = router;
