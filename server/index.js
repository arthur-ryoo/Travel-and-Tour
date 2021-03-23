const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const config = require('./config/key');

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

db.once('connected', () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/build'));
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  // });
  // app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Express app running on port ${port}`));
