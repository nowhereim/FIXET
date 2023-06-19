"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    static associate(models) {
      Asset.belongsTo(models.Company, {
        foreignKey: "identifier",
        targetKey: "companyId",
        as: "admin",
        onDelete: "CASCADE", //
        onUpdate: "CASCADE",
      });
      Asset.belongsTo(models.Category, {
        foreignKey: "category",
        targetKey: "categoryId",
        onDelete: "no action",
        onUpdate: "CASCADE",
      });
      // Asset.belongsTo(models.Department, {
      //   foreignKey: "department",
      //   targetKey: "departmentId",
      //   onDelete: "no action",
      //   onUpdate: "CASCADE",
      // });
      Asset.belongsTo(models.Status, {
        foreignKey: "status",
        targetKey: "statusId",
        onDelete: "no action",
        onUpdate: "CASCADE",
      });
    }
  }
  Asset.init(
    {
      assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      assetNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING, // 실사용자
      status: DataTypes.INTEGER, //상태선택
      category: DataTypes.INTEGER, // 품목
      identifier: DataTypes.INTEGER, // 식별자
      serialNumber: DataTypes.STRING, // 시리얼번호
      product: DataTypes.STRING, // 제품명
      manufacturer: DataTypes.STRING, // 제조사
      acquisitionDate: DataTypes.STRING, // 취득일자
      location: DataTypes.STRING, // 위치
      note: DataTypes.STRING, // 비고
      team: DataTypes.STRING, //팀
    },
    {
      sequelize,
      modelName: "Asset",
    },
  );
  // Asset.sequelize.sync({ alter: true });
  return Asset;
};
