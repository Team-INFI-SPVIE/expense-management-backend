const { Sequelize } = require("sequelize");

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: "mssql",
  }
);

sequelize.sync((err) => {
  console.log("Database Sync errror", err);
});

module.exports = sequelize;
