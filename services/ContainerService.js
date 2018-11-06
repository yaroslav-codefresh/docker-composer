const ContainerDao = require('../dao/ContainerDao');

class ContainerService {
  static dao() {
    return ContainerDao;
  }
}

module.exports = ContainerService;