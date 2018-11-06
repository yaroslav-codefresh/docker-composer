const router = require('express').Router();
const ContainerController = require('../controllers/ContainerController');

router.route('/')
  .get(ContainerController.getAll)
  .post(ContainerController.create);

router.route('/:id')
  .get(ContainerController.get)
  .put(ContainerController.update)
  .delete(ContainerController.delete);

module.exports = router;