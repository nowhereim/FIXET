import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

interface CompanyAttributes {
  companyId?: number;
  admin: number;
}

class Company extends Model<CompanyAttributes> {
  public companyId!: number;
  public admin!: number;

  public static associate(models: any) {
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

export default Company;
