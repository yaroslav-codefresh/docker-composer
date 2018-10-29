const DockerService = require('../services/DockerService');
const ServiceCommand = require('../command/ServiceCommand');
const timer = require('../helpers/timer');
const docker = require('../docker/client');
const assert = require('chai').assert;
const sinon = require('sinon');
const log = require('../logger');


describe('DockerService', function () {
  this.timeout(0);
  describe('#applyDirectives()', function () {
    it('should create each service and remove it after 5 sec', async () => {
        const services = {
          server: {
            image: 'nginx'
          },
          database: {
            image: 'redis'
          }
        };
        const serviceNames = Object.keys(services);

        await DockerService.applyDirectives({services});

        let set = await containersSet();
        serviceNames.forEach(name => assert.isTrue(set.has(name)));


        await timer(6000);
        set = await containersSet();
        serviceNames.forEach(name => assert.isFalse(set.has(name)));
      }
    );

    it('should create each dependant service after its dependency', async () => {
      // fuck me -- how to do this???

      const services = {
        server_one: {
          image: 'nginx',
          depends_on: [
            'server_two'
          ]
        },
        server_two: {
          image: 'nginx',
          depends_on: [
            'database'
          ]
        },
        database: {
          image: 'redis',
        }
      };

      const actualOrder = [];
      const expectedOrder = ['database', 'server_two', "server_one"];

      const fake = sinon.fake(function () {
        return timer(500).then(() => {
          actualOrder.push(this.name);
          log.info(`Service created: ${this.name}`)
        })
      });
      sinon.replace(ServiceCommand.prototype, '_runInternal', fake);

      await DockerService.applyDirectives({services});

      assert.deepEqual(actualOrder, expectedOrder);
    });
  });
});

async function containersSet() {
  const containers = await docker.listContainers();
  return containers
    .map(c => c.Names[0].replace('/', ''))
    .reduce((set, next) => set.add(next), new Set());
}


