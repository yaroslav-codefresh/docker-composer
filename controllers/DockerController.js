const ValidationError = require('../errors/ValidationError');
const DockerService = require('../services/DockerService');
const extractYaml = require('../helpers/extractYaml');
const handler = require('../helpers/handler');

class DockerController {
  static async applyYaml(req, res) {
      const file = extractYaml(req.files);
      if (!file) {
        throw new ValidationError('no file provided');
      }

      const result = await DockerService.applyYaml(file.data.toString());
      res.json(result);
  }
}

module.exports = handler(DockerController);


