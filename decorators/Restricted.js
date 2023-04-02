const authenticate = require("../middleware/authenticate");

module.exports = function Restricted(fn) {
  return function (req, res, next) {
    authenticate(req, res, function () {
      const user = req.user;
      const isUser = [req.params.id, req.body.id].includes(user.id.toString());
      if (!isUser && !user.admin) {
        return res.sendStatus(403);
      }

      if (fn) return fn(req, res, next);
      return next();
    });
  };
};
