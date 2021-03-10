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
  });
}

function register(req, res) {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.json({ success: false, err });
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
        return res.json({ loginSuccess: false, message: 'bad credentials' });
      }
    });
  });
}

function logout(req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
}

module.exports = {
  auth,
  register,
  login,
  logout,
};
