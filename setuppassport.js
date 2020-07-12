var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

var User = require("./models/user");


module.exports = function(){
    passport.serializeUser(function(user,done){
        done(null,user._id);
    });

    passport.deserializeUser(function(id,done){
        User.findById(id,function(error, user){
            done(error,user);
        });
    });

    passport.use("login", new localStrategy({
        usernameField:'email',
        passwordField:'password'
    },function(email, password, done){
        console.log("Verifying User: "+email);
        User.findOne({email: email}, function(error, user){
            console.log("Returned findOne:"+user);
            if(error)
                return done(error);
            if(!user)
                return done(null, false, {message:"email not present in system."});

            user.checkPassword(password, function(error, isMatch){
                if(error)
                    return done(error);

                if(isMatch){
                    console.log(" Login success");
                    return done(null,user);
                }
                else {   
                    console.log(" Login Failed");
                    return done(null, false, {message: "Invalid Password!"});
                }   

            });
        });
        
    }));
}