var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var param = require("./params/params");
var bodyParser = require("body-parser");
//var routes = require("./routes");
var setUpPassport = require("./setuppassport");



var app = express();


app.set("port",process.env.PORT||2599);
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
setUpPassport();

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
        secret:"kjo0!kljkla&9875216MlaUKJH%$as",
        resave:false,
        saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use("/",require("./routes/web"));
app.use("/api",require("./routes/api"));
mongoose.connect(param.DATABASECONNECTION,{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true},function(err,db){
    if(err){
        console.error("DB not connected");
        throw err;

    }
    console.log("Connected.");

});

app.listen(app.get("port"),function() {
    console.log("Server started on Port:"+app.get("port"));
    
});