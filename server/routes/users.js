const router = require('express').Router();
const { auth } = require('../middleware/auth');
const usersController = require('../controllers/users');

router.get('/auth', auth, usersController.auth);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/logout', auth, usersController.logout);
router.post('/carts/add', auth, usersController.addToCart);
router.get('/carts/remove/:id', auth, usersController.removeFromCart);
router.post('/payments', auth, usersController.savePaymentInfo);

module.exports = router;
