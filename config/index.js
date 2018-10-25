var nconf = require('nconf');
var path = require('path');

nconf.argv().env();

var environment = nconf.get('NODE_ENV') || 'default';

nconf.argv()
  .env()
  .file({file: path.join(__dirname, './' + environment.toLowerCase() + '.json')});

module.exports = new Proxy(nconf, {
  get: (target, p) => target.get(p),
  set: () => {
  } // do nothing
});