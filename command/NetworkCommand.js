const log = require('../logger');
const Command = require('../command');

module.exports = class NetworkCommand extends Command {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => log.info(`network created: '${this.name}'`));
  }
};