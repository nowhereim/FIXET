import { Asset } from "../models/models.js";

export interface AssetInstance extends Asset {
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
  ldsTotalCount: number;
  monitorTotalCount: number;
  mobileTotalCount: number;
  officeequipmentTotalCount: number;
  otherequipmentTotalCount: number;
  softwareTotalCount: number;
}
