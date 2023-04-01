const express = require("express");
const appRouter = express.Router();
const app = express();
const ejs = require("ejs");
const path = require("path");
const SETTINGS = require("../settings");
const LOGGER = require("../logger");
const DB = require("./DB");
const errorhandler = require("../utils/errorhandler");
require("dotenv").config();

// Set view engine
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("view engine", "ejs");

// Package Middleware
app.use(express.static(path.join("views")));
app.use(express.json());

// Connect to database
DB.connect("./db/jsondb.json").create();
DB.createTable({
  name: "users",
  columns: [
    { name: "id", type: "number", unique: true, required: true, primary: true },
    { name: "username", type: "string", unique: true, required: true },
    { name: "password", type: "string", required: true },
  ],
});
DB.createTable({
  name: "sneakers",
  columns: [
    { name: "id", type: "number", unique: true, required: true, primary: true },
    { name: "name", type: "string", unique: true, required: true },
    { name: "color", type: "string", required: true },
    { name: "price", type: "number", required: true },
  ],
});

// Custom Middleware
app.use("/", appRouter);

app.use(errorhandler);

app.get("/403", function (req, res) {
  res.status(403).render("pages/403");
});

app.get("/401", function (req, res) {
  res.status(401).render("pages/401");
});

app.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

// Start server
app.listen(SETTINGS.port, () =>
  LOGGER.info("Server started on port", SETTINGS.port)
);

module.exports = appRouter;
