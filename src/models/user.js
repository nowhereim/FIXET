"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Company, {
        foreignKey: "identifier",
        targetKey: "companyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Company, {
        foreignKey: "admin",
        sourceKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      agreePi: DataTypes.BOOLEAN,
      identifier: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      job: DataTypes.STRING,
      company: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  // sequelize.sync({ alert: true });
  return User;
};
