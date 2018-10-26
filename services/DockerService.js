const log = require('../logger');
const yaml = require('yaml');

module.exports = class DockerService {
  static applyYaml(fileContent) {
    const directives = yaml.parse(fileContent);
    return this.applyDirectives(directives);
  }

  static async applyDirectives(directives) {
    const all = {
      ...directives.services,
      ...directives.volumes,
      ...directives.networks
    };

    for (const name in directives.services) {
      log.info(`service: ${name}`);
    }
    for (const name in directives.volumes) {
      log.info(`volume: ${name}`);
    }
    for (const name in directives.networks) {
      log.info(`network: ${name}`);
    }

    return {ok: true}
  }
};
