var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");


router.get("/", function(req,resp){
    //console.log("I am in root get path");
    resp.render("home/");
});

router.get("/home", function(req,resp){
    //console.log("I am in root get path");
    resp.render("home/home");
});

router.get("/about", function(req,resp){
    //console.log("I am in root get path");
    resp.render("home/about");
});

router.get("/login", function(req,resp){
    resp.render("home/login");
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
 });
 
router.get("/register", function(req,resp) {
    resp.render("home/register");
});

router.post("/login", passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true
}));

router.post("/register", function(req, resp, next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({email:email }, function(error, user){
        if(user){
            req.flash("error", "This email already registered.")
            return resp.redirect("/register");
        }

        var newUser = new User({
            username:username,
            password:password,
            email:email
        });

        newUser.save(next);

    });

}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/register",
    failureFlash: true
}));

module.exports = router;