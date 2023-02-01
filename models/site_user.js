const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Site_user = sequelize.define(
    "Site_user",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
    },
    { timestamps: false }
  );

  return Site_user;
};
