const express = require('express');
const router = express.Router();

//setting routes
router.use("/", require("./home"));
router.use("/login", require("../controllers/loginController"))
router.use("/register", require("../controllers/registerController"))
router.use("/logout", require("./logout"))

module.exports = router;