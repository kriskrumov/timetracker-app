// libraries and constants

const User = require('../models/user');
const passport = require("passport");

// get the EJS register page

exports.getRegisterPage = (req,res)=>{
    res.render("register");
}

// create a user and authenticate with passport

exports.register = (req,res)=>{
    User.register(new User({username: req.body.username, email: req.body.email, name: req.body.name}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        })
    });
}

// get EJS login page

exports.getLoginPage = (req,res)=>{
    const errors = req.flash().error || [];
    res.render('login', {errors})
}

// logout user

exports.logout = (req,res)=>{
    req.logOut();
    res.redirect('/');
}

// checks if the user is authenticated with passport, for security purposes

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/")
}

// login user using passport

exports.login = (req, res, next)=> {
    passport.authenticate("local", {
    successRedirect: "/home",
    failureFlash: true,
    failureRedirect: "/"
}) (req,res,next)
}

// get EJS homepage

exports.getHome = (req,res) => {
    res.render("home");
}