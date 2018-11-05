module.exports = function (controller) {
  for (const property of Object.getOwnPropertyNames(controller)) {
    let endpoint = controller[property];
    if (typeof endpoint === 'function') {
      controller[property] = async function (req, res, next) {
        try {
          await endpoint(req, res, next);
        } catch (e) {
          next(e)
        }
      }
    }
  }
  return controller;
};