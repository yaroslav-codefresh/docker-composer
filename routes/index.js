const rootRouter = require('./root_route');
const dockerRouter = require('./docker_route');
const containerRouter = require('./container_route');

module.exports = function (app) {
  app.use('/', rootRouter);
  app.use('/docker', dockerRouter);
  app.use('/container', containerRouter);
};