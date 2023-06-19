const express = require("express");
const router = express.Router();
const UserRoutes = require("./userRoutes");
const AssetRoutes = require("./assetRoutes");
const authorization = require("../middlewares/auth_middlewares.js");
const Authrouter = require("./authRoutes");

router.use("/user", UserRoutes);
router.use("/asset",  AssetRoutes);
router.use("/authtoken", Authrouter);

module.exports = router;
