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

const db = {};

db.sequelize = sequelize;
db.User = require("./models/user")(sequelize);

db.sequelize.sync({ alter: true });

module.exports = db;
