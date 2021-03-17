const router = require('express').Router();
const { auth } = require('../middleware/auth');
const usersController = require('../controllers/users');

router.get('/auth', auth, usersController.auth);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/logout', auth, usersController.logout);
router.post('/addToCart', auth, usersController.addToCart);

module.exports = router;
