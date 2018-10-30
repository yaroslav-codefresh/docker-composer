const log = require('../logger');

class BaseCommand {
  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.dependencies = [];
  }

  addDependency(dependency) {
    if (dependency instanceof BaseCommand) {
      this.dependencies.push(dependency);
      log.info(`${this.name} -> ${dependency.name}`)
    }
  }

  /**
   * Runs all the dependencies first, then _runInternal()
   * @returns singleton promise for previous operations
   * */
  run() {
    if (!this.executable) {
      this.executable = Promise.all(this.dependencies.map(command => command.run()))
        .then(() => this._runInternal())
    }
    return this.executable;
  }

  /**
   * Must be implemented by child classes
   * */
  _runInternal() {
    const message = 'Command run on base class. Please define "_runInternal()" on the child class';
    return Promise.reject(new Error(message));
  }

  /**
   * Must be implemented by child classes
   * */
  cleanUp() {
    const message = 'Method "cleanUp()" not defined. Please define "cleanUp()" on the child class';
    return Promise.reject(new Error(message));
  }
}

module.exports = BaseCommand;