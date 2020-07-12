var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
const SALT_FACTOR=13;
var userSchema = mongoose.Schema({
    username :{type:String, required:true},
    email : {type:String, required:true},
    password : {type:String, required:false},
    CreatedAt: {type:Date, default:Date.now}
});



userSchema.pre("save", function (done){

    var user = this;

    if(!user.isModified("password"))
        return done();
    
    bcrypt.genSalt(SALT_FACTOR, function(error, salt){
            if(error) 
                return done(error);
            bcrypt.hash( user.password, salt, function(error, hashedPassword){
                if(error)
                    return done(error);

                user.password = hashedPassword;
                done();
            });
    });
});

userSchema.methods.checkPassword = function(guess, done){
    console.log("UserSchmea checkPassword:"+this.password+", guess:"+guess);
    if(this.password != null)
        bcrypt.compare(guess, this.password, function(error, isMatch){
                done(error, isMatch);
        });
}
var User = mongoose.model("User", userSchema);
module.exports =  User;