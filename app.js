const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const errorHandler = require('./errors/handler');

const rootRouter = require('./routes/root');

const app = express();


app.use(logger('dev'));
app.use(express.json());

app.use('/', rootRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
