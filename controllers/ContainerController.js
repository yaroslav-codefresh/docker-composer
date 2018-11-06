const ContainerService = require('../services/ContainerService');
const handler = require('../helpers/handler');
const ValidationError = require('../errors/ValidationError');

class ContainerController {
  static async create(req, res) {
    const result = await ContainerService.dao().create(req.body);
    return res.json(result);
  }

  static async update(req, res) {
    const id = retrieveId(req);
    const result = await ContainerService.dao().update(id, req.body);
    return res.json(result);
  }

  static async get(req, res) {
    const id = retrieveId(req);
    const result = await ContainerService.dao().findOne(id);
    return res.json(result);
  }

  static async getAll(req, res) {
    const result = await ContainerService.dao().findAll(req.body);
    return res.json(result);
  }

  static async delete(req, res) {
    const id = retrieveId(req);
    const result = await ContainerService.dao().delete(id);
    return res.json(result);
  }
}

function retrieveId(req) {
  const id = req.params.id;
  if (!id) {
    throw new ValidationError('id must be provided')
  }
  return id;
}

module.exports = handler(ContainerController);