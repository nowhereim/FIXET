const express = require("express");
const router = express.Router();
const AssetControllers = require("../controllers/assetControllers");
this.assetControllers = new AssetControllers();

router.post("/", this.assetControllers.createAsset);
router.post("/excel/:identifier", this.assetControllers.excelCreateAsset);
router.patch("/", this.assetControllers.updateAsset);
router.delete("/", this.assetControllers.deleteAsset);
router.get("/", this.assetControllers.readAsset);
router.get("/search", this.assetControllers.categoryReadAsset);
router.get("/dashboard", this.assetControllers.dashboardReadAsset);
module.exports = router;
