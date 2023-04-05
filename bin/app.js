const express = require("express");
const appRouter = express.Router();
const app = express();
const ejs = require("ejs");
const path = require("path");
const SETTINGS = require("../settings");
const LOGGER = require("./Logger");
const errorhandler = require("../middleware/errorhandler");
require("dotenv").config();

// Set view engine
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("view engine", "ejs");

// Package Middleware
app.use(express.static(path.join("views")));
app.use(express.json());

// Connect to database


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
