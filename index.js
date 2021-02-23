const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose')
const db = mongoose.connection;
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
});

db.once('connected', () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
  });


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Express app running on port ${port}`))
