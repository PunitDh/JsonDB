const Model = require("../bin/Model");
const Cart = require("./Cart");

class User extends Model {
  constructor(data = {}) {
    super(data);
    this.username = data.username;
    this.password = data.password;
    this.admin = data.admin;
  }

  get cart() {
    return Cart.findBy({ user_id: this.id });
  }
}

module.exports = User;
