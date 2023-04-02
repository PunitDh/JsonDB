const { Router } = require("express");
const Sneaker = require("../models/Sneaker");
const Secured = require("../decorators/Secured");

const sneakers = Router();

sneakers.get("/", Secured(), (req, res, next) => {
  const sneakers = Sneaker.all();
  return res.status(200).send(sneakers);
});

sneakers.post("/", (req, res, next) => {
  const sneaker = Sneaker.create(req.body);
  return res.status(201).send(sneaker);
});

sneakers.put("/:id", (req, res, next) => {
  const sneaker = Sneaker.update(req.params.id, req.body);
  return res.status(201).send(sneaker);
});

sneakers.delete("/:id", (req, res, next) => {
  const sneaker = Sneaker.delete(req.params.id);
  return res.status(200).send(sneaker);
});

module.exports = sneakers;
