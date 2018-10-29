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
    log.warn('Command run on base class. Please define "_runInternal()" on the child class');
    return Promise.reject();
  }

  cleanUp() {
    log.warn('method "cleanUp()" not defined. Please define "cleanUp()" on the child class');
    return Promise.reject();
  }
};