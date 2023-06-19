const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/auth_middlewares.js");
const UserControllers = require("../controllers/userControllers");
this.userControllers = new UserControllers();
router.post("/signup", this.userControllers.signUp);
router.post("/signin", this.userControllers.signIn);
router.patch("/", this.userControllers.updateUser);
router.patch("/email", authorization, this.userControllers.patchEmail);
router.delete("/", authorization, this.userControllers.deleteUser);
router.get("/readuser", authorization, this.userControllers.readUser);
router.post("/authmail", this.userControllers.authMail);
router.post("/authcode", this.userControllers.authCode);
router.patch("/resetpassword", this.userControllers.resetPassword);
router.delete("/signout", authorization, this.userControllers.signout);
router.post("/checkuserinfo", this.userControllers.checkUser);

module.exports = router;
