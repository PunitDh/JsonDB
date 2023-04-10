const { Router } = require("express");
const CartItem = require("../models/CartItem");
const Secured = require("../decorators/Secured");
const Restricted = require("../decorators/Restricted");

const cartItems = Router();

cartItems.get("/", Secured(), (req, res, next) => {
  const cartItems = CartItem.all();
  return res.status(200).send(cartItems);
});

cartItems.get("/cart/:cart_id", Secured(), (req, res, next) => {
  const cartItems = CartItem.where({ cart_id: req.params.cart_id });
  return res.status(200).send(cartItems);
});

cartItems.get("/:id", Secured(), (req, res, next) => {
  const cartItem = CartItem.find(req.params.id);
  return res.status(200).send(cartItem);
});

cartItems.post("/", (req, res, next) => {
  const cartItem = CartItem.findBy({
    cart_id: req.body.cart_id,
    sneaker_id: req.body.sneaker_id,
  });
  if (!cartItem) {
    const created = CartItem.create(req.body);
    return res.status(201).send(created);
  } else {
    cartItem.quantity += 1;
    cartItem.save();
    return res.status(201).send(cartItem);
  }
});

cartItems.put("/", (req, res, next) => {
  const cartItem = CartItem.findBy({
    cart_id: req.body.cart_id,
    sneaker_id: req.body.sneaker_id,
  });
  if (!cartItem) return res.status(400).send("Item not in cart");
  if (req.body.quantity < 0 || !req.body.quantity) {
    return res.status(400).send("Quantity cannot be negative or undefined");
  }
  cartItem.quantity = Math.floor(req.body.quantity);
  cartItem.save();
  return res.status(201).send(cartItem);
});

cartItems.delete("/", (req, res, next) => {
  const cartItem = CartItem.findBy({
    cart_id: req.body.cart_id,
    sneaker_id: req.body.sneaker_id,
  });
  if (!cartItem) return res.status(400).send("Item not in cart");

  if (cartItem.quantity === 1) {
    CartItem.delete(cartItem.id);
    return res.status(200).send("Item deleted from cart");
  }
  cartItem.quantity -= 1;
  cartItem.save();
  return res.status(201).send(cartItem);
});

cartItems.delete("/all", Restricted(), (req, res, next) => {
  const cartItemIds = CartItem.all().map((item) => item.id);
  cartItemIds.forEach((id) => CartItem.delete(id));
  return res.status(200).send(cartItemIds);
});

module.exports = cartItems;
