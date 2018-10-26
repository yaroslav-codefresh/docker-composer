const log = require('../logger');

module.exports = function (req, res, next) {
  log.info(`${req.method} ${req.url}`);
  next()
};