const { Sequelize } = require("sequelize");

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: "mssql",
    logging: false,
  }
);

/*** Mise en place des relations */
const db = {};

db.sequelize = sequelize;
db.Role = require("./models/role")(sequelize);
db.User = require("./models/user")(sequelize);
db.Category = require("./models/category")(sequelize);
db.Product = require("./models/product")(sequelize);
db.Site = require("./models/site")(sequelize);
db.Site_user = require("./models/site_user")(sequelize);
db.Command = require("./models/command")(sequelize);

// Rélation Role et User
db.Role.hasMany(db.User, { foreignKey: "roleId", onDelete: "cascade" });
db.User.belongsTo(db.Role, { foreignKey: "roleId" });

// Rélation Category Produit
db.Category.hasMany(db.Product, {
  foreignKey: "categoryId",
  onDelete: "cascade",
});
db.Product.belongsTo(db.Category, { foreignKey: "categoryId" });

// Rélation plusieur a plusieur User et Site
db.User.belongsToMany(db.Site, { through: db.Site_user });
db.Site.belongsToMany(db.User, { through: db.Site_user });

// Rélation plusieur a plusieur User et Product
db.User.hasMany(db.Product, { foreignKey: "userId", onDelete: "cascade" });
db.Product.belongsTo(db.User, { foreignKey: "userId" });

// Relation command user
db.User.hasMany(db.Command, { foreignKey: "userId", onDelete: "cascade" });
db.Command.belongsTo(db.User, { foreignKey: "userId" });

// Relation command site
db.Site.hasMany(db.Command, { foreignKey: "siteId", onDelete: "cascade" });
db.Command.belongsTo(db.Site, { foreignKey: "siteId" });

// Relation command product
db.Product.hasMany(db.Product, {
  foreignKey: "productId",
  onDelete: "cascade",
});
db.Command.belongsTo(db.Product, { foreignKey: "productId" });

db.sequelize.sync({ alter: true });

module.exports = db;
