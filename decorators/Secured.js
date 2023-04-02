const authenticate = require("../middleware/authenticate");

module.exports = function Secured(fn) {
  return function (req, res, next) {
    authenticate(req, res, function () {
      if (fn) return fn(req, res, next);
      return next();
    });
  };
};
