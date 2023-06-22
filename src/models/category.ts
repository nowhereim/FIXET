import { Model, DataTypes, Sequelize } from "sequelize";

export default interface CategoryAttributes {
  categoryId?: number;
  category: string;
}

class Category extends Model<CategoryAttributes> {
  public categoryId!: number;
  public category!: string;

  public static associate(models: any) {
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
export const CategoryFactory = (sequelize: Sequelize) => {
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
  return Category;
};
