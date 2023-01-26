const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const User = require("../models/user");
const Role = require("../models/role");

const ToHave = DB.define(
  "ToHave",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },

    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  { paranoid: true }
);

module.exports = ToHave;
