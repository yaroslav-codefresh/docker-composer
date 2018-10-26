const {createLogger, transports} = require('winston');
const format = require('./format');

module.exports = createLogger({
  format: format,
  transports: [
    new transports.Console()
  ]
});
