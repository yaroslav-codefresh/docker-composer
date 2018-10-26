const log = require('../logger');
const ValidationError = require('../errors/ValidationError');
const DockerService = require('../services/DockerService');

module.exports = class DockerController {
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
};

const mimetype = 'text/yaml';
function extractYaml(files) {
  for (const name in files) {
    if (files.hasOwnProperty(name) && files[name].mimetype === mimetype) {
      log.info(`file found: ${name}`);
      return files[name];
    }
  }
  return null;
}
