const router = require('express').Router();
const DockerController = require('../controllers/DockerController');

router.post('/compose/yaml', DockerController.applyYaml);

module.exports = router;