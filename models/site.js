const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Site = sequelize.define(
    "Site",
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
    { timestamps: false }
  );

  return Site;
};
