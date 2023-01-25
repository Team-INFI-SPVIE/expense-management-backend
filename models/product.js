const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const User = require("../models/user");
const Category = require("../models/category");

const Product = DB.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: "id",
    //   },
    // },
    // categoryId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Category,
    //     key: "id",
    //   },
    // },
  },
  { paranoid: true }
);

module.exports = Product;
