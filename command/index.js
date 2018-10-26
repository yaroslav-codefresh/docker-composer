const log = require('../logger');

module.exports = class Command {
  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.dependencies = [];
  }

  addDependency(dependency) {
    if (dependency instanceof Command) {
      this.dependencies.push(dependency);
      log.info(`${this.name} -> ${dependency.name}`)
    }
  }

  run() {
    if (!this.executable) {
      this.executable = Promise.all(this.dependencies.map(command => command.run()))
        .then(() => this._runInternal())
    }
    return this.executable;
  }

  _runInternal() {
    log.warn('Command run on base class');
    return Promise.resolve(); // todo : maybe reject
  }
};