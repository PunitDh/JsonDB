const { Router } = require("express");
const User = require("../models/User");
const JWT = require("../utils/JWT");
const Secured = require("../decorators/Secured");
const { hashPassword, verifyPassword } = require("../utils/cryptit");

const users = Router();

users.get("/", (req, res, next) => {
  try {
    const users = User.all();
    return res.send(users.map((user) => user.exclude("password")));
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
    return res.send(user.exclude("password"));
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

users.post("/login", (req, res, next) => {
  try {
    const user = User.findBy({ username: req.body.username });
    if (!user) return res.status(404).send("User not found");
    if (!verifyPassword(req.body.password, user.password))
      return res.status(401).send("Wrong password");
    return res.send(JWT.sign(user.exclude("password")));
  } catch (e) {
    next(e);
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
    return res.send(JWT.sign(user.exclude("password")));
  } catch (e) {
    next(e);
  }
});

users.delete("/:id", Secured(), (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token);

    if (decoded.id != req.params.id) {
      return res.sendStatus(403);
    }
    const user = User.delete(req.params.id);
    return res.send(user.exclude("password"));
  } catch (e) {
    next(e);
  }
});

module.exports = users;
