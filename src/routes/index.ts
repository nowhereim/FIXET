import express from "express";
import UserRoutes from "./userRoutes.js";
import AssetRoutes from "./assetRoutes.js";
import Authrouter from "./authRoutes.js";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/asset", AssetRoutes);
router.use("/authtoken", Authrouter);

export default router;
