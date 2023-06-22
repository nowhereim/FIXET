import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface AssetAttributes {
  [x: string]: any;
  assetId: number;
  assetNumber: number;
  name?: string;
  status?: number;
  category?: number;
  identifier: string;
  serialNumber?: string;
  product?: string;
  manufacturer?: string;
  acquisitionDate?: string;
  location?: string;
  note?: string;
  team?: string;
}

interface AssetCreationAttributes
  extends Optional<AssetAttributes, "assetId"> {}

class Asset extends Model<AssetAttributes, AssetCreationAttributes> {
  public assetId!: number;
  public assetNumber!: number;
  public name?: string;
  public status?: number;
  public category?: number;
  public identifier!: string;
  public serialNumber?: string;
  public product?: string;
  public manufacturer?: string;
  public acquisitionDate?: string;
  public location?: string;
  public note?: string;
  public team?: string;

  public static associate(models: any) {
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
    Asset.belongsTo(models.Status, {
      foreignKey: "status",
      targetKey: "statusId",
      onDelete: "no action",
      onUpdate: "CASCADE",
    });
  }
}

export const AssetFactory = (sequelize: Sequelize): typeof Asset => {
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
      name: DataTypes.STRING,
      status: DataTypes.INTEGER,
      category: DataTypes.INTEGER,
      identifier: DataTypes.INTEGER,
      serialNumber: DataTypes.STRING,
      product: DataTypes.STRING,
      manufacturer: DataTypes.STRING,
      acquisitionDate: DataTypes.STRING,
      location: DataTypes.STRING,
      note: DataTypes.STRING,
      team: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Asset",
    },
  );
  return Asset;
};
