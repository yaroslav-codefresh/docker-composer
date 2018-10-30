const log = require('../logger');
const timer = require('../helpers/timer');
const BaseCommand = require('./BaseCommand');

/**
 * simulated volume creation
 * */
class VolumeCommand extends BaseCommand {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    return timer(1000)
      .then(() => log.info(`volume created: '${this.name}'`));
  }

  async cleanUp() {
    log.info(`network removed: '${this.name}'`);
  }
}

module.exports = VolumeCommand;