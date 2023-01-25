const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const User = require("../models/user");
const Site = require("../models/site");

const Belong = DB.define(
  "Belong",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    siteId: {
      type: DataTypes.INTEGER,
      references: {
        model: Site,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { paranoid: true }
);

module.exports = Belong;
