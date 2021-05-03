const User = require('../models/user');
const passport = require("passport");

exports.getRegisterPage = (req,res)=>{
    res.render("register");
}

exports.register = (req,res)=>{
    User.register(new User({username: req.body.username, email: req.body.email, name: req.body.name}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
            console.log("registete user: ", user);
        })
    });
}

exports.getLoginPage = (req,res)=>{
    const errors = req.flash().error || [];
    res.render('login', {errors})
}

exports.logout = (req,res)=>{
    req.logOut();
    res.redirect('/');
    console.log('u just logged out broda')
}

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/")
}

exports.login = (req, res, next)=> {
    passport.authenticate("local", {
    successRedirect: "/home",
    failureFlash: true,
    failureRedirect: "/"
}) (req,res,next)
}

exports.getHome = (req,res) => {
    res.render("home");
}