const log = require('../logger');
const Command = require('../command');

module.exports = class VolumeCommand extends Command {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => log.info(`volume created: '${this.name}'`));
  }
};