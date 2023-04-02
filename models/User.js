const Model = require("../bin/Model");

class User extends Model {
  constructor(data = {}) {
    super(data);
    this.username = data.username;
    this.password = data.password;
    this.admin = data.admin;
  }
}

module.exports = User;
