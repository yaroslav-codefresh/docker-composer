const ValidationError = require('../errors/ValidationError');
const DockerService = require('../services/DockerService');
const extractYaml = require('../helpers/extractYaml');

class DockerController {
  static async applyYaml(req, res, next) {
    try {
      const file = extractYaml(req.files);
      if (!file) {
        next(new ValidationError('no file provided'));
        return;
      }

      const result = await DockerService.applyYaml(file.data.toString());
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = DockerController;


