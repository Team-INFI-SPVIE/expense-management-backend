const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const User = require("../models/user");

const Category = DB.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },

    userId: {
      type: DataTypes.INTEGER,
    },

    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: "id",
    //   },
    // },
  },
  { paranoid: true }
);

module.exports = Category;
