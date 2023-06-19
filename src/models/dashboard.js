"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dashboard extends Model {
    static associate(models) {
      Dashboard.belongsTo(models.Category, {
        foreignKey: "category",
        targetKey: "categoryId",
        onDelete: "no action",
        onUpdate: "CASCADE",
      });
    }
  }
  Dashboard.init(
    {
      dashboardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      category: DataTypes.INTEGER,
      note: DataTypes.STRING,
      identifier: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Dashboard",
    },
  );
  //   Dashboard.sequelize.sync({ alter: true });
  return Dashboard;
};
