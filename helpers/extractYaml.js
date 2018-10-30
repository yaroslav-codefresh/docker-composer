const mimetype = 'text/yaml';

/**
 * extract first yaml from request
 * */
function extractYaml(files) {
  for (const name in files) {
    if (files.hasOwnProperty(name) && files[name].mimetype === mimetype) {
      log.info(`file found: ${name}`);
      return files[name];
    }
  }
  return null;
}

module.exports = extractYaml;