const { Router } = require("express");
const User = require("../models/User");
const JWT = require("../utils/JWT");
const Secured = require("../decorators/Secured");
const { hashPassword, verifyPassword } = require("../utils/cryptit");
const Restricted = require("../decorators/Restricted");

const users = Router();

users.get("/", (req, res, next) => {
  try {
    const users = User.all();
    return res.status(200).send(users.map((user) => user.exclude("password")));
  } catch (e) {
    next(e);
  }
});

users.post("/register", (req, res, next) => {
  try {
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(400).send("Passwords do not match");
    }
    const user = User.create({
      username: req.body.username,
      password: hashPassword(req.body.password),
    });
    return res.status(201).send(JWT.sign(user.exclude("password")));
  } catch (e) {
    e.status = 400;
    return next(e);
  }
});

users.post("/login", (req, res, next) => {
  try {
    const user = User.findBy({ username: req.body.username });
    if (!user) return res.status(404).send("User not found");
    if (!verifyPassword(req.body.password, user.password))
      return res.status(401).send("Wrong password");
    return res.status(201).send(JWT.sign(user.exclude("password")));
  } catch (e) {
    return next(e);
  }
});

users.put("/toggle-admin/:id", Restricted(), (req, res, next) => {
  try {
    const user = User.find(req.params.id);
    user.admin = !user.admin || false;
    user.save();
    return res.status(201).send(user.exclude("password"));
  } catch (e) {
    return next(e);
  }
});

users.put("/", Secured(), (req, res, next) => {
  try {
    const user = User.findBy({ username: req.body.username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (!verifyPassword(req.body.oldPassword, user.password)) {
      return res.status(401).send("Old password does not match");
    }
    if (req.body.newPassword === req.body.oldPassword) {
      return res
        .status(400)
        .send("New password cannot be the same as the old password");
    }
    if (req.body.newPassword !== req.body.newPasswordConfirmation) {
      return res.status(400).send("New passwords do not match");
    }
    user.username = req.body.username;
    user.password = hashPassword(req.body.newPassword);
    user.save();
    return res.status(201).send(JWT.sign(user.exclude("password")));
  } catch (e) {
    next(e);
  }
});

users.delete("/:id", Restricted(), (req, res, next) => {
  try {
    const user = User.delete(req.params.id);
    return res.status(200).send(user.exclude("password"));
  } catch (e) {
    next(e);
  }
});

module.exports = users;
