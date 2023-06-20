import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

interface DashboardAttributes {
  dashboardId?: number;
  name: string;
  category: number;
  note: string;
  identifier: string;
  createdAt?: Date;
}

class Dashboard extends Model<DashboardAttributes> {
  public dashboardId!: number;
  public name!: string;
  public category!: number;
  public note!: string;
  public identifier!: number;
  public createdAt?: Date;

  public static associate(models: any) {
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

export default Dashboard;
