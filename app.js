// Libraries

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require('express-session');
const flash = require('connect-flash');

// setting up mongoDB with the help of mongoose package

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://marblezstars:go6oneaka@roommate.o1zfc.mongodb.net/roomMate?retryWrites=true&w=majority");

// Consts and variables

const app = express();
const port = 3000;

// Middleware

app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((session)({
    secret: "This is a secret message",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// Responsible for reading the session, taking the data from the session.

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=======
// ROUTES


// AUTHENTICATION ROUTES

app.get("/register", function(req, res){
    res.render("register");
})

app.post("/register", function(req, res){
    User.register(new User({username: req.body.name, email: req.body.email}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        })
    });
})

// LOGIN ROUTES
app.get("/", function(req, res){
    const errors = req.flash().error || [];
    res.render("login", {errors});
})

// Login logic
app.post("/",passport.authenticate("local", {
    successRedirect: "/home",
    failureFlash: true,
    failureRedirect: "/"
}),function(req,res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/")
}

app.get("/home", isLoggedIn, function(req, res){
    res.render("home");
})

// Starts server and start listening for connections on specified port

app.listen(port, function(){
    console.log("Server started......");
})