const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/authControllers");
this.authControllers = new AuthControllers();
router.post("/", this.authControllers.accToken);
module.exports = router;
