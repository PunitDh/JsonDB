const express = require("express");
const appRouter = express.Router();
const app = express();
const ejs = require("ejs");
const path = require("path");
const SETTINGS = require("../settings");
const LOGGER = require("./Logger");
const JsonDB = require("./JsonDB");
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
const db = new JsonDB();
db.connect("./db/jsondb.enc").create();
db.createTable({
  name: "users",
  columns: [
    { name: "id", type: "number", unique: true, required: true, primary: true },
    { name: "username", type: "string", unique: true, required: true },
    { name: "password", type: "string", required: true },
    { name: "admin", type: "boolean", default: false },
  ],
});
db.createTable({
  name: "sneakers",
  columns: [
    { name: "id", type: "number", unique: true, required: true, primary: true },
    { name: "name", type: "string", unique: true, required: true },
    { name: "color", type: "string", required: true },
    { name: "price", type: "number", required: true },
  ],
});

db.createTable({
  name: "carts",
  columns: [
    { name: "id", type: "number", unique: true, required: true, primary: true },
    {
      name: "user_id",
      type: "number",
      unique: true,
      required: true,
      foreignKey: { table: "users", column: "id" },
    },
  ],
});

db.createTable({
  name: "cartitems",
  columns: [
    { name: "id", type: "number", unique: true, required: true, primary: true },
    {
      name: "cart_id",
      type: "number",
      required: true,
      foreignKey: { table: "carts", column: "id" },
    },
    {
      name: "sneaker_id",
      type: "number",
      required: true,
      foreignKey: { table: "sneakers", column: "id" },
    },
    {
      name: "quantity",
      type: "number",
      default: 1,
    },
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
