const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const Role = DB.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  { paranoid: true }
);

module.exports = Role;
