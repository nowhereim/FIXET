import express from "express";
import AssetControllers from "../controllers/assetControllers.js";

const router = express.Router();
const assetControllers = new AssetControllers();

router.post("/", assetControllers.createAsset);
router.post("/excel/:identifier", assetControllers.excelCreateAsset);
router.patch("/", assetControllers.updateAsset);
router.delete("/", assetControllers.deleteAsset);
router.get("/", assetControllers.readAsset);
router.get("/search", assetControllers.categoryReadAsset);
router.get("/dashboard", assetControllers.dashboardReadAsset);

export default router;
