const log = require('../logger');
const Command = require('../command');

module.exports = class ServiceCommand extends Command {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => log.info(`service created: '${this.name}'`));
  }
};