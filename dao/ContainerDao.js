const Container = require('../models/Container');

class ContainerDao {
  static model() {
    return Container;
  }

  static create(data) {
    return Container.create(data);
  }

  static update(id, data) {
    return Container.findByIdAndUpdate(id, data, {new: true}).exec();
  }

  static findOne(id) {
    return Container.findById(id).exec()
  }

  static findAll(query = {}) {
    return Container.find(query).exec()
  }

  static delete(id) {
    return Container.findByIdAndDelete(id).exec()
  }
}

module.exports = ContainerDao;