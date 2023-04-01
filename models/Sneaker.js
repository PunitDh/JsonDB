const Model = require("../bin/Model");

class Sneaker extends Model {
  constructor(data = {}) {
    super(data);
    this.name = data.name;
    this.color = data.color;
    this.price = data.price;
  }
}

module.exports = Sneaker;
