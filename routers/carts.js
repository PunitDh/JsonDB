const { Router } = require("express");
const Cart = require("../models/Cart");
const Secured = require("../decorators/Secured");
const User = require("../models/User");

const carts = Router();

carts.get("/", Secured(), (req, res, next) => {
  const carts = Cart.all();
  return res.status(200).send(carts);
});

carts.get("/user", Secured(), (req, res, next) => {
  const cart = Cart.find(req.query.cart_id);
  const user = User.find(cart.user_id).exclude("password");
  cart.user = user;
  return res.status(200).send(cart);
});

carts.get("/:id", Secured(), (req, res, next) => {
  const cart = Cart.find(req.params.id);
  return res.status(200).send(cart);
});

carts.post("/", (req, res, next) => {
  const cart = Cart.create(req.body);
  return res.status(201).send(cart);
});

carts.put("/:id", (req, res, next) => {
  const cart = Cart.update(req.params.id, req.body);
  return res.status(201).send(cart);
});

carts.delete("/:id", (req, res, next) => {
  const cart = Cart.delete(req.params.id);
  return res.status(200).send(cart);
});

module.exports = carts;
