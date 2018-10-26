const express = require('express');
const fileUpload = require('express-fileupload');
const createError = require('http-errors');
const logger = require('morgan');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const rootRouter = require('./routes/root');
const dockerRouter = require('./routes/docker');

const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(requestLogger);

app.use('/', rootRouter);
app.use('/docker', dockerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
