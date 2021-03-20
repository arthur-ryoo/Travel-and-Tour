const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const { User } = require('../models/User');
const async = require('async');

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
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
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

function removeFromCart(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      '$pull': { 'cart': { 'id': req.params.id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.forEach((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate('userId')
        .exec((err, productInfo) => {
          return res.status(200).json({
            productInfo,
            cart,
          });
        });
    }
  );
}

function savePaymentInfo(req, res) {
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.updateMany(
              {
                _id: item.id,
              },
              {
                $inc: {
                  'sold': item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res
              .status(200)
              .json({ success: true, cart: userInfo.cart, cartDetail: [] });
          }
        );
      });
    }
  );
}

module.exports = {
  auth,
  register,
  login,
  logout,
  addToCart,
  removeFromCart,
  savePaymentInfo,
};
