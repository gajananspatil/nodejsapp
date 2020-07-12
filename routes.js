var express = require("express");
var router = express.Router();

router.get("/", function(req,resp){
    console.log("I am in root get path");
    resp.render("home/index")
});

router.get("/home", function(req,resp){
    console.log("I am in root get path");
    resp.render("home/home")
});

module.exports = router;