const log = require('../logger');
const BaseCommand = require('./BaseCommand');
const docker = require('../docker/client');


module.exports = class ServiceCommand extends BaseCommand {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    const {image} = this.options;
    return docker
      .pull(image)
      .then(() => docker.createContainer({
        'Hostname': '',
        'User': '',
        'AttachStdin': false,
        'AttachStdout': false,
        'AttachStderr': false,
        'Tty': false,
        'OpenStdin': false,
        'StdinOnce': false,
        'Env': null,
        'Cmd': [],
        'Image': image,
        'Volumes': {},
        'VolumesFrom': [],
        'name': this.name
      }))
      .then(container => container.start())
      .then(() => log.info(`service created: '${this.name}'`));

  }
};