import logger from "../utils/logger.js";
import AssetServices from "../services/assetServices.js";
import { Request, Response, NextFunction } from "express";
import {
  AssetInstance,
  AssetCount,
  ReadAssetInput,
  ReadAssetOutput,
} from "../interface/interfaces.js";
class AssetControllers {
  private assetServices: AssetServices;
  constructor() {
    this.assetServices = new AssetServices();
  }

  createAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const val = req.body;
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
      const asset = await this.assetServices.excelCreateAsset(identifier, val);
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assets = req.body;
      const asset = await this.assetServices.updateAsset(assets);
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assets = req.body;
      const asset = await this.assetServices.deleteAsset(assets);
      return res.status(200).send({ asset });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  readAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const val = req.query.id as unknown as ReadAssetInput;
      const asset = await this.assetServices.readAsset(val);
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
      const val = req.query.id as string;
      const result = await this.assetServices.categoryReadAsset(val);
      if (result.error) {
        return res.status(400).send(result);
      }
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
      const val = req.query.id as unknown as ReadAssetInput;
      const result = await this.assetServices.dashboardReadAsset(val);
      return res.status(201).send(result);
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };
}

export default AssetControllers;
