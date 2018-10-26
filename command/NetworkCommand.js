const log = require('../logger');
const BaseCommand = require('./BaseCommand');

module.exports = class NetworkCommand extends BaseCommand {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => log.info(`network created: '${this.name}'`));
  }
};