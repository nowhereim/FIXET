import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
interface StatusAttributes {
  statusId?: number;
  status: string;
}

class Status extends Model<StatusAttributes> {
  public statusId!: number;
  public status!: string;
  public static associate(models: any) {
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

// Status.Sequelize.sync({ alter: true });

export default Status;
