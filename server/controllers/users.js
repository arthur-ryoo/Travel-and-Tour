const { User } = require('../models/User');

function auth(req, res) {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
}

function register(req, res) {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
}

function login(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'bad credentials',
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res
            .cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      } else {
        return res
          .status(400)
          .json({ loginSuccess: false, message: 'bad credentials' });
      }
    });
  });
}

function logout(req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
}

function addToCart(req, res) {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let isDuplicated = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        isDuplicated = true;
      }
    });

    if (isDuplicated) {
      User.findOneAndUpdate(
        { _id: req.user._id, 'cart.id': req.body.productId },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true }
      ),
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        };
    } else {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
}

module.exports = {
  auth,
  register,
  login,
  logout,
  addToCart,
};
