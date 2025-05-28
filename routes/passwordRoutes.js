const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { changePassword } = require("../controllers/authController");


router.post("/change", verifyToken, changePassword);

module.exports = router;
