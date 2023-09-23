const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const protected = require("../middlewares/protected");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router
	.route("/user")
	.get(protected, authController.getUser)
	.put(protected, authController.updateUser);

module.exports = router;
