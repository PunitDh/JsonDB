const app = require("./bin/app");

const pages = require("./routers/pages");
app.use("/", pages);

const sneakers = require("./routers/sneakers");
app.use("/sneakers", sneakers);

const users = require("./routers/users");
app.use("/users", users);

const carts = require("./routers/carts");
app.use("/carts", carts);

const cartitems = require("./routers/cartitems");
app.use("/cartitems", cartitems);
