const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const Site = DB.define(
  "Site",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING,
    },
  },
  { paranoid: true }
);

module.exports = Site;
