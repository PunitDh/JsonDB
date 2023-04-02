const app = require("./bin/app");

const pages = require("./routers/pages");
app.use("/", pages);

const sneakers = require("./routers/sneakers");
app.use("/sneakers", sneakers);

const users = require("./routers/users");
app.use("/users", users);
