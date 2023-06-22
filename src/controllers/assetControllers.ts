import logger from "../utils/logger.js";
import AssetServices from "../services/assetServices.js";
import { Request, Response, NextFunction } from "express";
import models, { sequelize } from "../models/index.js";
import {
  Asset,
  Category,
  Company,
  Dashboard,
  Status,
  User,
  AssetInstance,
  AssetCount,
  ReadAssetInput,
  ReadAssetOutput,
  dashboardReadAssetInterface,
} from "../interface/AssetInterfaces.js";
class AssetControllers {
  private assetServices: AssetServices;
  constructor() {
    this.assetServices = new AssetServices();
  }

  createAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const val: typeof models.Asset = req.body;
      const asset = await this.assetServices.createAsset(val);
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  excelCreateAsset = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { identifier } = req.params;
      const val = req.body;
      const asset: string = await this.assetServices.excelCreateAsset(
        identifier,
        val,
      );
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assets = req.body;
      const asset: string = await this.assetServices.updateAsset(assets);
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assets = req.body;
      const asset: string = await this.assetServices.deleteAsset(assets);
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  readAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const val = req.query as unknown as ReadAssetInput;
      const asset: ReadAssetOutput = await this.assetServices.readAsset(val);
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  categoryReadAsset = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const val = req.query;
      const result: ReadAssetOutput =
        await this.assetServices.categoryReadAsset(val);
      return res.status(201).send(result);
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  dashboardReadAsset = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const val = req.query as unknown as ReadAssetInput;
      const result: dashboardReadAssetInterface =
        await this.assetServices.dashboardReadAsset(val);
      return res.status(201).send(result);
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };
}

export default AssetControllers;
