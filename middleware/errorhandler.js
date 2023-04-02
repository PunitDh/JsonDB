const LOGGER = require("../bin/Logger");

module.exports = function (err, req, res, next) {
  LOGGER.error(err.stack);
  return res.status(err.status || 400).send(err.message);
};
