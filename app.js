const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const createError = require('http-errors');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const registerRoutes = require('./routes');

const app = express();

mongoose.connect(config.mongo.url, {useNewUrlParser: true});

app.use(express.json());
app.use(fileUpload());
app.use(requestLogger);

registerRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
