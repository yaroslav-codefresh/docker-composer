const config = require('../config');
const Docker = require('dockerode');

module.exports = new Docker(config.docker);