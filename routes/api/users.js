var express = require("express");
var router = express.Router();

router.get("/", function(req,resp) {
    resp.json("This is json data for user api");
});


module.exports = router;