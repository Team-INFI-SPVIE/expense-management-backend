const express = require("express");
const cors = require("cors");
const checkTokenMiddleware = require("./jsonwebtoken/check");

let DB = require("./db.config");
const User = DB.User;
const Role = DB.Role;
const Category = DB.Category;
const Site = DB.Site;

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
const command_router = require("./routes/commands");

// Routing
app.get("/", (_, res) => res.send(`Welcome...`));
app.use("/roles", role_router);
app.use("/users", user_router);
app.use("/categories", category_router);
app.use("/auth", auth_router);
app.use("/sites", site_router);
app.use("/products", product_router);
app.use("/commands", command_router);

app.get("*", (_, res) =>
  res.status(501).send("What the hell are you doing !?!")
);

async function generateDefaultData(id) {
  // Generate default role
  const cashierRoleData = {
    name: "Cashier",
    createdAt: new Date(),
  };
  await Role.create(cashierRoleData);

  // Generate default user
  const data = {
    firstName: "DIALLO",
    lastName: "Amadou Benthe",
    phone: "0584100000",
    email: "amadouAdmin@test.com",
    roleId: 1,
    password: "password",
    createdAt: new Date(),
  };
  await User.create(data);

  // Generate default category
  const categoryData = {
    name: "bureautique",
    userId: 1,
    createdAt: new Date(),
  };
  await Category.create(categoryData);

  const siteData = {
    name: "Port-Bouet",
  };

  await Site.create(siteData);
}

DB.sequelize
  .authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, async () => {
      console.log(
        `This server is running on localhost:${process.env.SERVER_PORT}.`
      );
    });
  })
  .then(async () => {
    const adminRoleData = {
      name: "Admin",
      createdAt: new Date(),
    };

    const [row, created] = await Role.findOrCreate({
      where: { id: 1 },
      defaults: adminRoleData,
    });

    if (created === true) {
      generateDefaultData(row["dataValues"]["id"]);
    }
  })
  .catch((err) => console.log("Database Error", err));
