const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

require('dotenv').config();

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1',
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG files are supported'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'travel-and-tour',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

module.exports = upload;
