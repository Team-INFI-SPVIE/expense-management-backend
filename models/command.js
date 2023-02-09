const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Command = sequelize.define(
    "Command",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      designation: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      siteId: {
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  return Command;
};
