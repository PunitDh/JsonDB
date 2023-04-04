const Model = require("../bin/Model");

class CartItem extends Model {
  constructor(data = {}) {
    super(data);
    this.cart_id = data.cart_id;
    this.sneaker_id = data.sneaker_id;
    this.quantity = data.quantity;
  }
}

module.exports = CartItem;
