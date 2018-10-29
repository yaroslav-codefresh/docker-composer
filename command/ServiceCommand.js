const log = require('../logger');
const timer = require('../helpers/timer');
const BaseCommand = require('./BaseCommand');
const docker = require('../docker/client');


module.exports = class ServiceCommand extends BaseCommand {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    const {image} = this.options;
    return docker
      .pull(image, {repo: 'library'})
      .then(() => docker.createContainer({
        'AttachStdin': false,
        'AttachStdout': false,
        'AttachStderr': false,
        'OpenStdin': false,
        'StdinOnce': false,
        'Cmd': [],
        'Image': image,
        'name': this.name
      }))
      .then(container => {
        this.container = container;
        return container.start()
      })
      .then(() => log.info(`service created: '${this.name}'`));
  }

  cleanUp() {
    return timer(5000)
      .then(() => this.container.stop())
      .then(() => this.container.remove())
      .then(() => log.info(`service removed: '${this.name}'`));
  }
};