"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.User, {
        foreignKey: "identifier",
        sourceKey: "companyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Company.belongsTo(models.User, {
        foreignKey: "admin",
        targetKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Company.hasMany(models.Asset, {
        foreignKey: "identifier",
        sourceKey: "companyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Company.init(
    {
      companyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admin: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Company",
    },
  );
  // Company.sequelize.sync({ alter: true });
  return Company;
};
