const log = require('../logger');
const yaml = require('parser-yaml');
const ServiceCommand = require('../command/ServiceCommand');
const NetworkCommand = require('../command/NetworkCommand');
const VolumeCommand = require('../command/VolumeCommand');

module.exports = class DockerService {
  static applyYaml(fileContent) {
    const directives = yaml.parseSync(fileContent);
    return this.applyDirectives(directives);
  }

  static async applyDirectives({services, volumes, networks}) {
    const commands = {};

    for (const name in services) {
      log.info(`service: ${name}`);
    }
    for (const name in volumes) {
      log.info(`volume: ${name}`);
    }
    for (const name in networks) {
      log.info(`network: ${name}`);
    }

    for (const name in services) {
      const directive = services[name];
      const command = getCommand(name, services, commands, ServiceCommand);

      const dependencies = directive.depends_on;
      const depNetworks = directive.networks;
      const depVolumes = directive.volumes;

      if (dependencies) {
        for (const dependency of dependencies) {
          command.addDependency(getCommand(dependency, services, commands, ServiceCommand))
        }
      }

      if (depNetworks) {
        for (const network of depNetworks) {
          command.addDependency(getCommand(network, networks, commands, NetworkCommand))
        }
      }

      if (depVolumes) {
        for (const name of depVolumes) {
          const volume = name.split(':')[0];
          if (volumes.hasOwnProperty(volume)) {
            command.addDependency(getCommand(volume, volumes, commands, VolumeCommand))
          }
        }
      }
    }

    const runnable = Object.values(commands);
    await Promise.all(runnable.map(c => c.run()));
    runnable.forEach(c => c.cleanUp());
    return {ok: true}
  }
};

function getCommand(name, directives, commands, CommandType) {
  let command = commands[name];
  if (!command) {
    command = new CommandType(name, directives[name] || {});
    commands[name] = command;
  }
  return command;
}