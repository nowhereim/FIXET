import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

interface UserAttributes {
  userId?: number;
  email: string;
  password: string;
  name?: string;
  agreePi: boolean;
  identifier?: number;
  phone?: string;
  job?: string;
  company?: string;
}

class User extends Model<UserAttributes> {
  public userId?: number;
  public email?: string;
  public password?: string;
  public name?: string;
  public agreePi?: boolean;
  public identifier?: number;
  public phone?: string;
  public job?: string;
  public company?: string;

  public static associate(models: any) {
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

export default User;
