import models from "../models/index.js";
import Asset from "../models/asset.js";
import Category from "../models/category.js";
import Company from "../models/company.js";
import Dashboard from "../models/dashboard.js";
import Status from "../models/status.js";
import User from "../models/user.js";
import sequelize from "../models/index.js";

export { Asset, Category, Company, Dashboard, Status, User, sequelize };
export interface AssetInstance extends InstanceType<typeof models.Asset> {
  assetNumber: number;
}

export interface AssetCount {
  count: number;
  "Category.categoryId": number;
}

export interface ReadAssetInput {
  page: number;
  identifier: string;
}

export interface ReadAssetOutput {
  Assets: AssetInstance[];
  totalCount: number;
  ldsTotalCount?: number;
  monitorTotalCount?: number;
  mobileTotalCount?: number;
  officeequipmentTotalCount?: number;
  otherequipmentTotalCount?: number;
  softwareTotalCount?: number;
}
export interface dashboardReadAssetInterface {
  Assets: (typeof models.Dashboard)[];
  totalCount: number;
}
