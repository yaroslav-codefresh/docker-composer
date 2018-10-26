const log = require('../logger');

module.exports = function (err, req, res, next) {
  res.status(err.status || 500);
  const message = err.message || err.constructor.name;
  log.error(err.status ? message : err.stack);
  res.json({message: message});
};