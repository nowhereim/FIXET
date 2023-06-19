"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Asset, {
        foreignKey: "status",
        sourceKey: "statusId",
        onDelete: "no action",
        onUpdate: "no action",
      });
    }
  }
  Status.init(
    {
      statusId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Status",
    },
  );
  // Status.sequelize.sync({ alter: true });
  return Status;
};
