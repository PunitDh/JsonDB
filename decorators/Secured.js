const User = require("../models/User");
const JWT = require("../utils/JWT");

module.exports = function Secured(fn) {
  return function (req, res, next) {
    // Extract the username and password from the authorization header
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send("Authorization header is missing");
    }

    const [type, token] = authorization.split(" ");
    if (!type || !token || type !== "Bearer") {
      return res.status(401).send("Invalid authorization header");
    }

    const decoded = JWT.verify(token);
    if (!decoded) {
      return res.status(401).send("Invalid token");
    }

    // Find the user in the database
    const user = User.findBy({ username: decoded.username });
    if (!user) {
      return res.status(401).send("Invalid user");
    }

    if (fn) return fn(req, res, next);
    return next();
  };
};
