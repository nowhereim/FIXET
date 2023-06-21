import express from "express";
import UserControllers from "../controllers/userControllers.js";
import authorization from "../middlewares/auth_middlewares.js";

const router = express.Router();
const userControllers = new UserControllers();

router.post("/signup", userControllers.signUp);
router.post("/signin", userControllers.signIn);
router.patch("/", userControllers.updateUser);
router.patch("/email", userControllers.patchEmail);
router.delete("/", userControllers.deleteUser);
router.get("/readuser", userControllers.readUser);
router.post("/authmail", userControllers.authMail);
router.post("/authcode", userControllers.authCode);
router.patch("/resetpassword", userControllers.resetPassword);
router.delete("/signout", userControllers.signout);
router.post("/checkuserinfo", userControllers.checkUser);

export default router;
