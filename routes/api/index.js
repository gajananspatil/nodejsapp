var express = require("express");
const { route } = require("../web");
var router = express.Router();

router.use("/users",require("./users"));

module.exports = router;