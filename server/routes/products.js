const router = require('express').Router();
const productsController = require('../controllers/products');

router.post('/image', productsController.uploadImage);
router.post('/', productsController.uploadProduct);

module.exports = router;
