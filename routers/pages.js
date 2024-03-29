const { Router } = require("express");
const DB = require("../bin/DB");
const Restricted = require("../decorators/Restricted");

const pages = Router();

pages.get("/visualize", Restricted(), (req, res, next) => {
  return res.send(DB.visualize());
});

module.exports = pages;
