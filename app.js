const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/userManagement');
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + 'mongodb://localhost/userManagement');
});
// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
