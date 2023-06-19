const logger = require("../../utils/logger");
const AssetServices = require("../services/assetServices");

class AssetControllers {
  constructor() {
    this.assetServices = new AssetServices();
  }

  createAsset = async (req, res, next) => {
    try {
      const val = req.body;
      const asset = await this.assetServices.createAsset(val);
      if (asset.error) {
        return res.status(400).send(asset);
      }
      return res.status(200).send({ asset });
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(400).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };

  excelCreateAsset = async (req, res, next) => {
    try {
      const { identifier } = req.params;
      const val = req.body;
      const asset = await this.assetServices.excelCreateAsset(identifier, val);
      if (asset.error) {
        return res.status(400).send(asset);
      }
      return res.status(200).send({ asset });
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(400).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };

  updateAsset = async (req, res, next) => {
    try {
      const assets = req.body;
      const asset = await this.assetServices.updateAsset(assets);
      if (asset.error) {
        return res.status(400).send(asset);
      }
      return res.status(200).send({ asset });
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(400).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };

  deleteAsset = async (req, res, next) => {
    try {
      const assets = req.body;
      const asset = await this.assetServices.deleteAsset(assets);
      if (asset.error) {
        return res.status(400).send(asset);
      }
      return res.status(200).send({ asset });
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(400).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };

  readAsset = async (req, res, next) => {
    try {
      const val = req.query;
      const asset = await this.assetServices.readAsset(val);
      if (asset.error) {
        return res.status(400).send(asset);
      }
      return res.status(200).send({ asset });
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(400).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };

  categoryReadAsset = async (req, res, next) => {
    try {
      const val = req.query;
      const result = await this.assetServices.categoryReadAsset(val);
      if (result.error) {
        return res.status(400).send(result);
      }
      return res.status(201).send(result);
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(400).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };

  dashboardReadAsset = async (req, res, next) => {
    try {
      const val = req.query;
      const result = await this.assetServices.dashboardReadAsset(val);
      if (result.error) {
        return res.status(400).send(result);
      }
      return res.status(201).send(result);
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(400).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };
}

module.exports = AssetControllers;
