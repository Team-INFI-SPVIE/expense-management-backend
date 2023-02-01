const express = require("express");
const cors = require("cors");
const checkTokenMiddleware = require("./jsonwebtoken/check");

let DB = require("./db.config");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders:
      "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const role_router = require("./routes/roles");
const user_router = require("./routes/users");
const auth_router = require("./routes/auth");
const product_router = require("./routes/products");
const site_router = require("./routes/sites");
const category_router = require("./routes/categories");

// Routing

app.get("/", (_, res) => res.send(`I'm online. All is OK !`));
app.use("/roles", role_router);
// app.use("/users", checkTokenMiddleware, user_router);
app.use("/users", user_router);
app.use("/categories", category_router);
app.use("/auth", auth_router);
app.use("/sites", site_router);

app.use("/products", product_router);

// app.use("/categories", category_router);

app.get("*", (req, res) =>
  res.status(501).send("What the hell are you doing !?!")
);

DB.sequelize
  .authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `This server is running on port ${process.env.SERVER_PORT}. Have fun !`
      );
    });
  })
  .catch((err) => console.log("Database Error", err));
