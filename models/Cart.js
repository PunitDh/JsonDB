const Model = require("../bin/Model");
const CartItem = require("./CartItem");
const Sneaker = require("./Sneaker");

class Cart extends Model {
  constructor(data = {}) {
    super(data);
    this.user_id = data.user_id;
  }

  withItems() {
    const cartItems = CartItem.where({ cart_id: this.id });
    const sneakers = cartItems.map((item) => {
      const sneaker = Sneaker.find(item.sneaker_id);
      return {
        ...sneaker,
        quantity: item.quantity,
        subTotal: item.quantity * sneaker.price,
      };
    });
    this.sneakers = sneakers;
    this.total = +this.sneakers
      .map((sneaker) => +sneaker.subTotal)
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);
    return this;
  }
}

module.exports = Cart;
