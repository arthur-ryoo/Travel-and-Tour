const router = require('express').Router();
const productsController = require('../controllers/products');

router.post('/images', productsController.uploadImage);
router.post('/', productsController.uploadProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);
router.patch('/:id', productsController.editProduct);
router.delete('/:id', productsController.deleteProduct);
router.get('/:id/view', productsController.countProductView);
module.exports = router;
