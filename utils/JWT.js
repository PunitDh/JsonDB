const JWT = require("jsonwebtoken");

module.exports = {
  sign: (object) => {
    return JWT.sign({ ...object }, process.env.JWT_SECRET, { expiresIn: "10m" });
  },
  verify: (token) => {
    return JWT.verify(token, process.env.JWT_SECRET);
  },
};
