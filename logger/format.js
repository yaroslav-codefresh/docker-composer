const {format} = require('winston');

module.exports = format.combine(
  format.colorize(),
  format.printf(info => `${new Date().toLocaleString()} -- ${info.level} : ${info.message}`)
);