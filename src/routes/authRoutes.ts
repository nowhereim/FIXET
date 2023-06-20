import express from "express";
import AuthControllers from "../controllers/authControllers.js";

const router = express.Router();
const authControllers = new AuthControllers();

router.post("/", authControllers.accToken);

export default router;
