const config = require('../config');
const log = require('../logger');
const Docker = require('dockerode');

class DockerClient extends Docker {
  constructor(options) {
    super(options)
  }

  async pull(image) {
    if (!image.includes(':')) {
      image = `${image}:latest`;
    }
    const stream = await super.pull(image);
    return await new Promise((resolve, reject) => this.modem.followProgress(
      stream,
      (err, output) => err ? reject(err) : resolve(output),
      event => log.info(event.status)
    ));
  }
}

module.exports = new DockerClient(config.docker);