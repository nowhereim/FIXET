"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Asset, {
        foreignKey: "category",
        sourceKey: "categoryId",
        onDelete: "no action",
        onUpdate: "no action",
      });
      Category.hasMany(models.Dashboard, {
        foreignKey: "category",
        sourceKey: "categoryId",
        onDelete: "no action",
        onUpdate: "CASCADE",
      });
    }
  }
  Category.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    },
  );
  // Category.sequelize.sync({ alter: true });
  return Category;
};
