const JsonDB = require("./JsonDB");

const DB = new JsonDB();
DB.connect("./db/jsondb.enc").create();

DB.createTable({
  name: "users",
  columns: [
    { name: "id", type: "number", unique: true, required: true, primary: true },
    { name: "username", type: "string", unique: true, required: true },
    { name: "password", type: "string", required: true },
    { name: "admin", type: "boolean", default: false },
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

DB.createTable({
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

DB.createTable({
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

module.exports = DB;
